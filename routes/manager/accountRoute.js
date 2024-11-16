const express = require("express")
const router = express.Router()
const controller = require("../../controller/manager/account_controller")
router.post("/login", controller.postLoginController)
router.get("/account", controller.getAccountController)
router.get("/accountStudent/:id", controller.getAcoountStudentController)
module.exports = router