const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/e-wallet_controller")

router.get("/", controller.eWalletController)
router.patch("/change", controller.changeEWalletController)
router.get("/change", controller.getEWaleetController)
router.post("/buy", controller.postBuyPaper)
module.exports = router