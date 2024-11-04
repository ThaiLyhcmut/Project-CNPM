const EWallet = require("../../model/E-wallets")


module.exports.eWalletController = async (req, res) => {
  const account = res.locals.account
  const ewallet = await EWallet.findOne({
    accountId: account.id
  })
  res.json({
    "code": "success",
    "msg": "lấy ví điện tử thành công",
    "ewallet": ewallet
  })
}

module.exports.changeEWalletController = async (req, res) => {
  switch (req.body.type) {
    case "add":
      await EWallet.updateOne({
        accountId: res.locals.account.id
      }, {
        $inc: {
          balance: parseInt(req.body.value)
        }
      })
      res.json({
        "code": "success",
        "msg": "Nạp tiền thành công"
      })
      return
    case "sub":
      const eWallet = await EWallet.findOne({
        accountId: res.locals.account.id
      })
      if(eWallet.balance < parseInt(req.body.value)){
        break;
      }
      await EWallet.updateOne({
        accountId: res.locals.account.id
      }, {
        $inc: {
          balance: -parseInt(req.body.value)
        }
      })
      res.json({
        "code": "success",
        "msg": "Thanh toán thành công"
      })
      return
    default:
      break;
  }
  res.json({
    "code": "error",
    "msg": "lỗi ví điện tử"
  })
}