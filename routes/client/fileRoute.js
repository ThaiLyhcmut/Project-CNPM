const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/file_controller")
const multer = require('multer');
const iconv = require('iconv-lite');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu trữ tệp
  },
  filename: (req, file, cb) => {
    // Chuyển đổi tên tệp sang UTF-8
    const originalName = `${Date.now()} - ${file.originalname}`;
    const utf8Name = iconv.decode(Buffer.from(originalName, 'latin1'), 'utf8');
    const newName = utf8Name.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu '-'
    cb(null, newName);
  }
  
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Kiểm tra loại MIME của file
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Chỉ cho phép tải lên file PDF'), false);
    }
    cb(null, true);
  }
});

router.get("/", controller.getFileController)
router.delete("/:id", controller.deleteFileController)
router.post("/",upload.single("file"), controller.fileController)

module.exports = router