const File = require("../../model/File")

module.exports.getFileController = async (req, res) => {
  const files = await File.find().sort({
    "updatedAt": 1
  })
  res.json({
    "code": "success",
    "msg": "Lấy file thành công",
    "files": files
  })
}