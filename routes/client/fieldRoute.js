const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/field_controller")

router.get("/", controller.getFieldController)

module.exports = router