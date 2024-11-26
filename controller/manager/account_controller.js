const md5 = require("md5")
const Account = require("../../model/Account")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret = process.env.JWT_SECRET

module.exports.getAccountController = async (req, res) => {
  const account = await Account.findOne({
    "_id": res.locals.account.id 
  }).select("name email phone avatar role")
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
  const account = await Account.findOne({
    "_id": id,
    "role": "student"
  }).select("name email")
  res.json({
    "code": "error",
    "msg": "Lấy ra account thành công",
    "account": account
  })
}

module.exports.getAllAcountController = async (req, res) => {
  const accounts = await Account.find({
    "role": "student"
  }).select("name id phone email")
  res.json({
    "code": "success",
    "accounts": accounts
  })
}