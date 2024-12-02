const jwt = require('jsonwebtoken');
const md5 = require("md5");
const { generateRandomNumber } = require("../../helper/generate_helper");
const { sendMail } = require("../../helper/sendMail_helper");
const { GetOtp, UpdateAccountPassword, InsertAccount, GetAccountByEmail, GetAccountById, InsertOtp, DeleteOtp } = require("../../service/account_service");
const { InsertEWallet } = require("../../service/e-wallet_service");
require('dotenv').config();
const secret = process.env.JWT_SECRET; 
module.exports.loginController = async (req, res) => {
  const userAgent = req.headers['user-agent'];
  if(!userAgent){
    res.json({
      "code": "error",
      "msg": "Mầy biến khỏi đây"
    })
    return
  }
  const email = req.body.email
  const password = req.body.password
  let account
  try {
    account = await GetAccountByEmail(email)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  }
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
      "role": account.role,
      "key": md5(userAgent)
    }
  }, secret, { expiresIn: '30m' });
  const rftoken = jwt.sign(
  {
    token: token,
    id: account.id
  }, secret, { expiresIn: '168h' });
  res.json({
    code: "success",
    role: account.role,
    token: token,
    rftoken: rftoken
  })
}

module.exports.resetPasswordController = async (req, res) => {
  const userAgent = req.headers['user-agent'];
  if(!userAgent){
    res.json({
      "code": "error",
      "msg": "Mầy biến khỏi đây"
    })
  }
  let isOtp
  try {
    const isOtp = await GetOtp(req.body.email)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  }
  if(!isOtp || isOtp.otp != req.body.otp){
    res.json({
      "code": "error",
      "msg": "otp không hợp lệ"
    })
    return
  }
  DeleteOtp(req.body.email, req.body.otp)
  if(req.body.email && req.body.password && req.body.name && req.body.phone){
    req.body.role = "student"
    req.body.password = md5(req.body.password)
    req.body.avatar = ""
    try {
      await InsertAccount(req.body)
    }
    catch (error) {
      return res.json({
        "code": "error"
      })
    }
    const newEWallet = {
      "accountId": newAccount.id,
      "balance": 0,
      "balancePaper": 0,
      "mssv": ""
    }
    InsertEWallet(newEWallet)
    const token = jwt.sign(
      {
        accountToken: {
          "id": newAccount.id,
          "email": newAccount.email,
          "role": newAccount.role,
          "key": md5(userAgent)
        }
      }, secret, { expiresIn: '30m' });
      const rftoken = jwt.sign(
      {
        token: token,
        id: newAccount.id
      }, secret, { expiresIn: '168h' });
    res.json({
      code: "success",
      role: newAccount.role,
      token: token,
      rftoken: rftoken
    })
    return 
  }
  else if(req.body.email && req.body.password) {
    let account
    try {
      account = await GetAccountByEmail(req.body.email)
    }
    catch (e) {
      return res.json({
        "code": "error"
      })
    } 
    if(account){
      try {
        await UpdateAccountPassword(account.id, md5(req.body.password))
      }
      catch (e) {
        return res.json({
          "code": "error"
        })
      } 
      const token = jwt.sign(
        {
          accountToken: {
            "id": account.id,
            "email": account.email,
            "role": account.role,
            "key": md5(userAgent)
          }
        }, secret, { expiresIn: '30m' });
        const rftoken = jwt.sign(
        {
          token: token,
          id: account.id
        }, secret, { expiresIn: '168h' });
      res.json({
        code: "success",
        role: account.role,
        token: token,
        rftoken: rftoken
      })
      return 
    }
  }
  res.json({
    code: "fail"
  })
}

module.exports.otpController = async(req, res) => {
  if(!req.body.email){
    res.json({
      "code": "error",
      "msg": "email mầy đâu thằng ngu"
    })
    return
  }
  const regex = /^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn/;
  if (!regex.test(req.body.email)) {
    return res.json({
      "code": "error",
      "msg": "Email không phải thuộc tổ chức của ĐHBK"
    })
  }
  let isOtp
  try {
    isOtp = await GetOtp(req.body.email)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  if(isOtp){
    res.json({
      "code": "error",
      "msg": "otp da duoc gui truoc do"
    })
    return
  }
  
  const otp = generateRandomNumber(6)
  const data = {
    email: req.body.email,
    otp: otp
  }
  InsertOtp(data)
  const subject = "Xac thuc ma OTP"
  const text = `${otp}`
  sendMail(req.body.email, subject, text)
  res.json({
    "code": "success",
    "msg": "Đã gửi otp thành công"
  })
}

module.exports.getAccountController = async (req, res) => {
  let account
  try{ 
    account = await GetAccountById(res.locals.account.id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "Lấy account thành công",
    "account": account
  })
}