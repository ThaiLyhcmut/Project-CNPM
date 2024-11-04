require('dotenv').config()
const database = require ("./config/database")
const express = require("express");
const routeAdmin = require("./routes/manager/index_route");
const routeClient = require("./routes/client/index_route")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const app = express()

const port = process.env.PORT;

database.connect(process.env.MONGO_URL)
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


routeClient(app)


app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})