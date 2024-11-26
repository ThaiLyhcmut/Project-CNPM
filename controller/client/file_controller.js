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
  const fileId = req.params.id;

  if (!fileId) {
    return res.status(400).json({
      code: "error",
      msg: "Lỗi: Không tìm thấy ID của file"
    });
  }

  try {
    // Thực hiện xóa file
    const result = await File.deleteOne({ "_id": fileId });

    // Kiểm tra xem file có tồn tại và đã được xóa thành công hay không
    if (result.deletedCount === 0) {
      return res.status(404).json({
        code: "error",
        msg: "Không tìm thấy file để xóa"
      });
    }

    // Nếu xóa thành công
    res.status(200).json({
      code: "success",
      msg: "Xóa file thành công"
    });

  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({
      code: "error",
      msg: "Đã xảy ra lỗi khi xóa file"
    });
  }
};

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