const { GetFieldByAccountId } = require("../../service/field_service")

module.exports.getFieldController = async (req, res) => {
  const account = res.locals.account
  let field
  try {
    field = await GetFieldByAccountId(account.id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  if (!field) {
    return res.json({
      "code": "error"
    })
  }
  res.json({
    "code": "success",
    "msg": "lay field thanh cong",
    "field": field
  })
}
