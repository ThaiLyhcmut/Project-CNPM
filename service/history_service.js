const History = require("../model/History")

// Get History 
module.exports.GetHistoryByAccountId = async (id) => {
  return await History.find({
    accountId: id
  })
}

module.exports.GetHistory = async (find) => {
  return History.find(find)
} 

// Delete History
module.exports.DeleteManyHistory = async (ids) => {
  return await History.deleteMany({
    accountId: ids 
  })
}

// Insert History
module.exports.InsertHistory = async (data) => {
  const record = new History(data)
  return await record.save()
}