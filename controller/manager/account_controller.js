const md5 = require("md5")
const Account = require("../../model/Account")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret = process.env.JWT_SECRET
module.exports.postLoginController = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const account = await Account.findOne({
    email: email
  })
  if(!email){
    res.json({
      code: "email khong ton tai"
    })
    return
  }
  if(!account){
    res.json({
      code: "account khong ton tai"
    })
    return
  }
  if(md5(password) != account.password){
    res.json({
      code: "mat khau khong chinh xac"
    })
    return
  }
  const token = jwt.sign(
  {
    accountToken: {
    "id": account.id,
    "email": account.email,
    "role": account.role
    }
  }, secret, { expiresIn: '12h' });
  // const refreshToken = jwt.sign( user.id , secret, { expiresIn: '12h' });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.json({
    code: "success",
    role: account.role,
    token: token
  })
}

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