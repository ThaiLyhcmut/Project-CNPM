const { GetFieldByAccountId } = require("../../service/field_service")

module.exports.getFieldController = async (req, res) => {
  const account = res.locals.account
  const field = await GetFieldByAccountId(account.id)
  res.json({
    "code": "success",
    "msg": "lay field thanh cong",
    "field": field
  })
}
