const { GetFile } = require("../../service/file_service")

module.exports.getFileController = async (req, res) => {
  let files
  try {
    files = await GetFile()
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "Lấy file thành công",
    "files": files
  })
}