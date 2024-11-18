
const express = require("express")

const router = express.Router()

const controller = require("../../controller/manager/printer_controller")

router.post("/create", controller.postPrintController)
router.get("/all", controller.getPrintStatusController)
router.get("/:id", controller.getDetailController)
router.patch("/changeStatus", controller.patchChangeMuiltiPrintController)
router.patch("/changeAll/:id", controller.patchChangePrinterController)
router.delete("/delete/:id", controller.deletePrinterController)
module.exports = router