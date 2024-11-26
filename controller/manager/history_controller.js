const History = require("../../model/History")

module.exports.getHistoryController = async(req, res) => {
  const find = {}
  if(req.query.status){
    find.status = req.query.status
  }
  if(req.query.cs){
    find.cs = req.query.cs
  }
  if(req.query.location){
    find.location = req.query.location
  }
  if(req.query.id){
    find._id = req.query.id
  }
  if(req.query.accountId){
    find.accountId = req.query.accountId
  }
  const historys = await History.find(find)
  res.json({
    "code": "success",
    "historys": historys
  })
}
