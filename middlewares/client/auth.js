const Account = require("../../model/Account")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret = process.env.JWT_SECRET

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token 
  if(!token) {
    return;
  }
  jwt.verify(token, secret, async (err, decoded) => {
    if(err){
      res.json({
        "code": "error",
        "msg": "token khong hop le"
      })
    }else{
      res.locals.account = decoded.accountToken
      next()
    }
  })
}