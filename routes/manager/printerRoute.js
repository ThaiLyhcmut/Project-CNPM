
const express = require("express")

const router = express.Router()

const controller = require("../../controller/manager/printer_controller")

router.post("/create", controller.postPrintController)
router.get("/all", controller.getPrintStatusController)
router.patch("/changeStatus", controller.patchChangeMuiltiPrintController)
router.patch("/changeAll", controller.patchChangePrinterController)
router.delete("/delete", controller.deletePrinterController)
module.exports = router