const Account = require("../../model/Account")
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const Otp = require("../../model/Otp");
const { generateRandomNumber } = require("../../helper/generate_helper");
const { sendMail } = require("../../helper/sendMail_helper");
const EWallet = require("../../model/E-wallets");
require('dotenv').config();
const secret = process.env.JWT_SECRET; 
module.exports.loginController = async (req, res) => {
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
    role: account.role
  })
}

module.exports.registerController = async (req, res) => {
  const account = await Account.findOne({
    email: req.body.email
  })
  if(account){
    res.json({
      "code": "error",
      "msg": "email da duoc dang ky tai khoan"
    })
    return
  }
  const isOtp = await Otp.findOne({
    email: req.body.email,
    otp: req.body.otp
  })
  if(!isOtp){
    res.json({
      "code": "error",
      "msg": "otp không hợp lệ"
    })
    return
  }
  if(req.body.email && req.body.password && req.body.name && req.body.phone){
    req.body.role = "student"
    req.body.password = md5(req.body.password)
    req.body.avatar = ""
    const newAccount = new Account(req.body)
    const newEWallet = new EWallet({
      "accountId": newAccount.id,
      "balance": 0,
      "mssv": ""
    })
    const token = jwt.sign(
      {
        accountToken: {
        "id": newAccount.id,
        "email": newAccount.email,
        }
      }, secret, { expiresIn: '12h' });
    await newAccount.save()
    await newEWallet.save()
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.json({
      code: "success",
      role: newAccount.role
    })
    return 
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
  const newAccount = await Account.findOne({
    email: req.body.email
  })
  if(newAccount){
    res.json({
      "code": "error",
      "msg": "email da duoc dang ky tai khoan"
    })
    return
  }
  const isOtp = await Otp.findOne({
    email: req.body.email
  })
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
  const record = new Otp(data)
  await record.save()
  const subject = "Xac thuc ma OTP"
  const text = `Ma xac thuc cua ban la <b>${otp}</b>. Ma OTP co hieu luc trong 3 phut. Vui long khong cung cap ma OTP cho bat ky ai\n Cấp cho thằng khác là ngu`
  sendMail(req.body.email, subject, text)
  res.json({
    "code": "success",
    "msg": "Đã gửi otp thành công"
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
