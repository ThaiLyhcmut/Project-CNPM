const { GetAccountById } = require("../../service/account_service");
require('dotenv').config();

module.exports.getAccountController = async (req, res) => {
  const account = await GetAccountById(res.locals.account.id)
  res.json({
    "code": "success",
    "msg": "Lấy account thành công",
    "account": account
  })
}

module.exports.getAcoountStudentController = async (req, res) => {
  const id = req.params.id
  if(!id) {
    res.json({
      "code": "error",
      "msg": "id may dau troi oi"
    })
    return
  }
  const account = await GetAccountById(id)
  res.json({
    "code": "error",
    "msg": "Lấy ra account thành công",
    "account": account
  })
}

module.exports.getAllAcountController = async (req, res) => {
  const accounts = await GetAccountRoleStudent()
  res.json({
    "code": "success",
    "accounts": accounts
  })
}