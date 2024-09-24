require('dotenv').config()
const database = require ("./config/database")
const express = require("express");
const routeAdmin = require("./routes/admin/index_route");
const routePrinter = require("./routes/printer/index_route");
const routeCustomer = require("./routes/customer/index_route")
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT;

database.connect(process.env.MONGO_URL)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))


routeAdmin(app)
// routePrinter(app)
routeCustomer(app)


app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})