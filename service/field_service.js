const Field = require("../model/Field")


// Insert Field
module.exports.InsertField = async (data) => {
  const record = new Field(data)
  return await record.save()
}

// Get Field
module.exports.GetFieldByAccountId = async (id) => {
  return await Field.find({
    accountId: id
  })
}

module.exports.GetField = async (find) => {
  return await Field.find(find)
}