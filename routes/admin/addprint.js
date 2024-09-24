
const express = require("express")

const router = express.Router()

const controller = require("../../controller/admin/registerPrinter_controller")

router.get("/register", controller.registerPrinter)
router.get("/addprint", controller.addprint)
module.exports = router