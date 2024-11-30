const Account = require("../model/Account")
const Otp = require("../model/Otp")
// Get Account
module.exports.GetAccountByEmail = async (email) => {
  return await Account.findOne({
    email: email
  })
} 

module.exports.GetAccountById = async (id) => {
  return await Account.findOne({
    _id:  id
  }).select("name email phone avatar role")
}

module.exports.GetAccountRoleStudent = async () => {
  return await Account.find({
    role: "student"
  }).select("name id phone email role")
}
// Update Account

module.exports.UpdateAccountPassword = async (id, password) => {
  await Account.updateOne({
    _id: id
  }, {
    password: password
  })
}

// Insert Account

module.exports.InsertAccount = async(data) => {
  const record = new Account(data)
  return await record.save()
}

module.exports.GetOtp = async (email) => {
  return await Otp.findOne({
    email: email,
  })
} 

module.exports.DeleteOtp = async (email, otp) => {
  return await Otp.deleteOne({
    email: email,
    otp: otp
  })
}

module.exports.InsertOtp = async (data) => {
  const record = new Otp(data)
  await record.save()
}