const express = require("express")

const router = express.Router()
const controller = require("../../controller/manager/file_controller")

router.get("/", controller.getFileController)

module.exports = router