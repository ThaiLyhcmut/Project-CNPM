const express = require("express")
const router = express.Router()
const controller = require("../../controller/manager/account_controller")
const middlewares = require("../../middlewares/manager/auth")
router.get("/account", middlewares.requireAuth, controller.getAccountController)
router.get("/accountStudent/:id", middlewares.requireAuth, controller.getAcoountStudentController)
router.get("/accountAll", middlewares.requireAuth, controller.getAllAcountController)
module.exports = router