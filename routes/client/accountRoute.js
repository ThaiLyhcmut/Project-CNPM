
const express = require("express")
const router = express.Router()
const MiddlewareAuth = require("../../middlewares/client/auth")
const controller = require("../../controller/client/account_controller")
const { rftoken } = require("../../helper/rftoken_helper")

router.post("/login", controller.loginController)
router.post("/resetToken", rftoken)
router.post("/register", controller.resetPasswordController)
router.post("/otp", controller.otpController)
router.get("/",MiddlewareAuth.requireAuth ,controller.getAccountController)

module.exports = router