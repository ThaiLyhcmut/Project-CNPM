require('dotenv').config();
const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const { GetEWalletByAccountId, UpdateEWalletPaper, UpdateEWalletByAccountId } = require("../../service/e-wallet_service");
const { InsertField } = require('../../service/field_service');

module.exports.eWalletController = async (req, res) => {
  const account = res.locals.account
  let ewallet
  try {
    ewallet = await GetEWalletByAccountId(account.id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "lấy ví điện tử thành công",
    "ewallet": ewallet
  })
}

module.exports.changeEWalletController = async (req, res) => {
  if(!req.body.value || isNaN(parseInt(req.body.value))) {
    return req.json({
      code: "error",
      msg: "Loi roi"
    })
  }
  switch (req.body.type) {
    case "add":
      try {
        await UpdateEWalletByAccountId(res.locals.account.id, parseInt(req.body.value))
      }
      catch (e) {
        return res.json({
          "code": "error"
        })
      } 
      res.json({
        "code": "success",
        "msg": "Nạp tiền thành công"
      })
      return
    case "sub":
      let eWallet
      try {
        eWallet = await GetEWalletByAccountId(res.locals.account.id)
      }
      catch (e) {
        return res.json({
          "code": "error"
        })
      } 
      if (!eWallet){
        return res.json({
          "code": "error"
        })
      }
      if(eWallet.balance < parseInt(req.body.value)){
        break;
      }
      try {
        await UpdateEWalletByAccountId(res.locals.account.id, -parseInt(balance))
      }
      catch (e) {
        return res.json({
          "code": "error"
        })
      } 
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
        try {
          await UpdateEWalletByAccountId(account.id, amount)
        }
        catch (e) {
          return res.json({
            "code": "error"
          })
        } 
        let ewallet
        try {
          ewallet = await GetEWalletByAccountId(account.id)
        }
        catch (e) {
          return res.json({
            "code": "error"
          })
        } 
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
        InsertField(data)
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
  let eWallet
  try {
    eWallet = await GetEWalletByAccountId(res.locals.account.id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
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
  }
  const balanceNew = eWallet.balance - balancePaper*500
  try {
    await UpdateEWalletPaper(eWallet.id, balanceNew, eWallet.balancePaper + balancePaper)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  const data = {
    "accountId": res.locals.account.id,
    "transaction": "Buy paper",
    "amount": balancePaper*500,
    "balance": balanceNew,
    "historyId": "",
  }
  InsertField(data)
  res.json({
    "code": "success",
    "msg": "Mua giay thanh cong"
  })
}