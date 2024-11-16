const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/history_controller")

router.get("/", controller.getHistoryController)
router.delete("/", controller.deleteHistoryManyController)

module.exports = router