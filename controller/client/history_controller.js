const File = require("../../model/File")

module.exports.getHistoryController = async (req, res) => {
  const account = res.locals.account
  files = await File.find({
    "_id": account.id
  })
  res.json({
    "code": "success",
    "msg": "lay thanh cong file",
    "files": files
  })
}

module.exports.deleteHistoryManyController = async (req, res) => {
  const ids = req.body.ids
  await File.deleteMany({
    "_id": ids 
  })
  res.json({
    "code": "success",
    "msg": "xoa lich su thanh cong",
  })
}

