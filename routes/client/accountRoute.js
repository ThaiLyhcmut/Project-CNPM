
const express = require("express")
const router = express.Router()
const MiddlewareAuth = require("../../middlewares/client/auth")
const controller = require("../../controller/client/account_controller")

router.post("/login", controller.loginController)
router.post("/register", controller.registerController)
router.post("/otp", controller.otpController)
router.get("/",MiddlewareAuth.requireAuth ,controller.getAccountController)

module.exports = router