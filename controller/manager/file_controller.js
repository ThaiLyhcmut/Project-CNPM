const { GetFile } = require("../../service/file_service")

module.exports.getFileController = async (req, res) => {
  const files = await GetFile()
  res.json({
    "code": "success",
    "msg": "Lấy file thành công",
    "files": files
  })
}