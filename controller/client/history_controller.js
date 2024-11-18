const File = require("../../model/File")
const History = require("../../model/History")

module.exports.getHistoryController = async (req, res) => {
  const account = res.locals.account
  historys = await History.find({
    "accountId": account.id
  })
  res.json({
    "code": "success",
    "msg": "lay thanh cong historys",
    "historys": historys
  })
}

module.exports.deleteHistoryManyController = async (req, res) => {
  const ids = req.body.ids
  await History.deleteMany({
    "accountId": ids 
  })
  res.json({
    "code": "success",
    "msg": "xoa lich su thanh cong",
  })
}

