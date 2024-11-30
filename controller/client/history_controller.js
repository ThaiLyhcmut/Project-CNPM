const { DeleteManyHistory, GetHistoryByAccountId } = require("../../service/history_service")

module.exports.getHistoryController = async (req, res) => {
  const account = res.locals.account
  const historys = await GetHistoryByAccountId(account.id)
  res.json({
    "code": "success",
    "msg": "lay thanh cong historys",
    "historys": historys
  })
}

module.exports.deleteHistoryManyController = async (req, res) => {
  const ids = req.body.ids
  await DeleteManyHistory(ids)
  res.json({
    "code": "success",
    "msg": "xoa lich su thanh cong",
  })
}

