const EWallet = require("../../model/E-wallets")
require('dotenv').config();
const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const Field = require("../../model/Field");
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

module.exports.getEWaleetController = async (req, res) => {
  const token = req.query.token
  const amount = parseInt(req.query.amount)
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      res.status(403).json({
        "code": "error",
        "msg": "Token không hợp lệ"
      });
      return 
    } else {
      const account = decoded.accountToken;
      await EWallet.updateOne({
        "accountId": account.id
      }, {
        $inc: {
          balance: amount
        } 
      })
      const ewallet = await EWallet.findOne({
        "accountId": account.id
      })
      res.json({
        "code": "success",
        "msg": "Nap tien thanh cong"
      })
      const data = {
        accountId: account.id,
        transaction: "Nap",
        amount: amount,
        balance: ewallet.balance,
        historyId: ""
      }
      const record = new Field(data)
      await record.save()
    }
  });
}