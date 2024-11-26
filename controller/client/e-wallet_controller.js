const EWallet = require("../../model/E-wallets")
require('dotenv').config();
const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const Field = require("../../model/Field");
const Account = require("../../model/Account");
const History = require("../../model/History");
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
  try{
    const token = req.query.token
    if (!req.query.amount) {
      res.json({
        "code": "error",
        "msg": "vui long nhap so tien"
      });
    }
    const amount = parseInt(req.query.amount)
    if (isNaN(amount)) {
      return res.json({
        code: "error",
        msg: "Số tiền không hợp lệ. Vui lòng nhập số tiền hợp lệ.",
      });
    }
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        res.status(401).json({
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
  }catch(error){
    res.json({
      "code": "error",
      "msg": error
    })
  }
}

module.exports.postBuyPaper = async (req, res) => {
  if(!req.body.balancePaper){
    res.json({
      "code": "error",
      "msg": "vui long nhap so tien"
    });
    return
  }
  const balancePaper = parseInt(req.body.balancePaper)
  console.log(balancePaper)
  if (isNaN(balancePaper) || balancePaper <= 0) {
    return res.json({
      code: "error",
      msg: "Số giấy không hợp lệ",
    });
  }
  const eWallet = await EWallet.findOne({
    "accountId": res.locals.account.id
  })
  if(!eWallet){
    return res.json({
      code: "error",
      msg: "ewallet loi",
    });
  }
  if(balancePaper*500 > eWallet.balance){
    return res.json({
      code: "error",
      msg: "ban khong du tien",
    });
  }os
  const balanceNew = eWallet.balance - balancePaper*500
  await EWallet.updateOne({
    "_id": eWallet.id
  }, {
    balance: balanceNew,
    balancePaper: eWallet.balancePaper + balancePaper
  })
  const record = new Field({
    "accountId": res.locals.account.id,
    "transaction": "Buy paper",
    "amount": balancePaper*500,
    "balance": balanceNew,
    "historyId": "",
  })
  await record.save()
  res.json({
    "code": "success",
    "msg": "Mua giay thanh cong"
  })
}