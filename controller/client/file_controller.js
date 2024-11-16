const { authorize, uploadFile } = require("../../helper/file_helper");
const File = require("../../model/File")
const pdf = require("pdf-parse");
const fs = require("fs")

module.exports.getFileController = async (req, res) => {
  const files = await File.find({
    "accountId": res.locals.account.id
  }).sort({
    "updatedAt": 1
  })
  res.json({
    "code": "success",
    "msg": "Lấy file thành công",
    "files": files
  })
}

module.exports.deleteFileController = async (req, res) => {
  const fileId = req.params.id
  if(!fileId) {
    res.json({
      "code": "succes",
      "msg": "Lỗi không tìm được file"
    })
  }
  await File.deleteOne({
    "id": fileId
  })
  res.json({
    "code": "succes",
    "msg": "xoa file thanh cong"
  })
}

async function countPdfPages(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  const data = await pdf(dataBuffer);
  console.log(`Số trang trong PDF là: ${data.numpages}`);
  return data.numpages;
}

module.exports.fileController = async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }
  const filePath = req.file.path;
  const auth = await authorize() 
  const file = await uploadFile(auth, filePath)
  if(!file){
    res.json({
      "code": "error",
      "msg": "gui file khong thanh cong"
    })
    return
  }
  const pages = await countPdfPages(req.file.path)
  const data = {
    name: req.file.path.replace(/^uploads[\\/]/, ''),
    link: `https://drive.google.com/file/d/${file.data.id}`,
    linkPath: req.file.path,
    pages: pages,
    accountId: res.locals.account.id
  }
  const record = await File(data)
  await record.save()
  res.json({
    "code": "success",
    "msg": "up file thành công",
    "file": record
  })
}