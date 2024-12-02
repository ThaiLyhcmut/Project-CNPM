const { GetField } = require("../../service/field_service")

module.exports.getFieldController = async (req, res) => {
  const find = {}
  if(req.query.id){
    find._id = req.query.id
  }
  if(req.query.transaction){
    find.transaction = req.query.transaction
  }
  let field
  try {
    field = await GetField(find)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code":"success",
    "msg": "Lấy field thành công",
    "field": field,
  })
}