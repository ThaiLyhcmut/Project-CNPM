const Field = require("../../model/Field")
const { find } = require("../../model/Printer")

module.exports.getFieldController = async (req, res) => {
  const find = {}
  if(req.query.id){
    find._id = req.query.id
  }
  if(req.query.transaction){
    find.transaction = req.query.transaction
  }
  const field = await Field.find(find)
  res.json({
    "code":"success",
    "msg": "Lấy field thành công",
    "field": field,
  })
}