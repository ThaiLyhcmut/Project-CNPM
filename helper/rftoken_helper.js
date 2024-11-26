const md5 = require("md5");
const Account = require("../model/Account");
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret = process.env.JWT_SECRET

module.exports.rftoken = async(req, res) => {
  const authHeader = req.headers['authorization'];
  const reftoken = authHeader && authHeader.split(' ')[1];
  const userAgent = req.headers['user-agent'];
  if (!reftoken) {
    return res.status(401).json({
      "code": "error",
      "msg": "reftoken không được cung cấp"
    });
  }
  if (!req.body.token){
    return res.status(401).json({
      "code": "error",
      "msg": "token không được cung cấp"
    });
  }
  jwt.verify(reftoken, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        "code": "error",
        "msg": "Token không hợp lệ"
      });
    }else{
      if(decoded.token === req.body.token){
        const account = await Account.findOne({
          "_id": decoded.id
        })
        if(!account){
          return res.status(401).json({
            "code": "error",
            "msg": "Token không hợp lệ"
          });
        }
        const token = jwt.sign(
          {
            accountToken: {
              "id": account.id,
              "email": account.email,
              "role": account.role,
              "key": md5(userAgent)
            }
          }, secret, { expiresIn: '30m' }
        );
        const rftoken = jwt.sign(
          {
            token: token,
            id: account.id
          }, secret, { expiresIn: '168h' }
        );
        res.json({
          code: "success",
          role: account.role,
          token: token,
          rftoken: rftoken
        })
        return
      }else{
        return res.status(403).json({
          "code": "error",
          "msg": "Token không hợp lệ"
        });
      } 
    }
  })
  
  
}