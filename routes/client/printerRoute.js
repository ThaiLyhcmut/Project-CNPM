const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/printer_controller")

router.get("/", controller.printerController)
router.post("/", controller.postPrinterController)

module.exports = router