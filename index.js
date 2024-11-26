require('dotenv').config()
const cors = require('cors');
const database = require ("./config/database")
const express = require("express");
const routeManager = require("./routes/manager/index_route");
const routeClient = require("./routes/client/index_route")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const History = require('./model/History');

const app = express()

const port = process.env.PORT;

database.connect(process.env.MONGO_URL)

app.use(cors());


app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.static("uploads"));


app.get("/funciton", (req, res) => {
  res.render("function");
});


const printerQueues = {};
const printerPromises = {};

async function processPrintJob(printerID, change) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log(`Máy in ${printerID} đang in cho ${change.fullDocument._id}`)
      await History.updateOne({
        "_id": change.fullDocument._id
      }, {
        "status": "success"
      })
      resolve();
    }, 20000);
  });
}

async function listenForChanges() {
  const changeStream = History.watch();

  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const printerID = change.fullDocument.printerId
      if (!printerQueues[printerID]) {
        printerQueues[printerID] = [];
      }
      printerQueues[printerID].push(change);
      if (!printerPromises[printerID]) {
        console.log(printerID)
        printerPromises[printerID] = (async () => {
          while (printerQueues[printerID].length > 0) {
            const nextChange = printerQueues[printerID].shift();
            await processPrintJob(printerID, nextChange);
          }
          delete printerPromises[printerID];
        })();
      }
    }
  });
}

listenForChanges();


routeClient(app)
routeManager(app)


app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})