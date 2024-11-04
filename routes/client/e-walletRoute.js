const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/e-wallet_controller")

router.get("/", controller.eWalletController)
router.patch("/change", controller.changeEWalletController)

module.exports = router