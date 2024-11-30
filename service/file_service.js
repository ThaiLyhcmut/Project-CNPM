const File = require("../model/File")

// Get File
module.exports.GetAllFileByAccountId = async (id) => {
  return await File.find({
    accountId: id
  }).sort({
    updatedAt: 1
  })
}

module.exports.GetFileById = async (id) => {
  return await File.findOne({
    _id: id
  })
}

module.exports.GetFile = async () => {
  return await File.find().sort({
    updatedAt: 1
  })
}

// Delete Fi
module.exports.DeleteFile = async (id) => {
  return File.deleteOne({
    _id: id
  })
}

// Insert File
module.exports.InsertFile = async (data) => {
  const record = await File(data)
  return await record.save()
}