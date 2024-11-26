const express = require("express")

const router = express.Router()
const controller = require("../../controller/manager/history_controller")

router.get("/", controller.getHistoryController)

module.exports = router