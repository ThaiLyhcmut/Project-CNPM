const express = require("express")
const router = express.Router()
const controller = require("../../controller/manager/account_controller")
const middlewares = require("../../middlewares/manager/auth")
router.post("/login", controller.postLoginController)
router.get("/account", middlewares.requireAuth, controller.getAccountController)
router.get("/accountStudent/:id", middlewares.requireAuth, controller.getAcoountStudentController)
module.exports = router