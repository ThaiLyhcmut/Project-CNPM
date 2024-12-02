const { DeleteManyHistory, GetHistoryByAccountId } = require("../../service/history_service")

module.exports.getHistoryController = async (req, res) => {
  const account = res.locals.account
  let historys
  try {
    historys = await GetHistoryByAccountId(account.id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "lay thanh cong historys",
    "historys": historys
  })
}

module.exports.deleteHistoryManyController = async (req, res) => {
  const ids = req.body.ids
  try {
    await DeleteManyHistory(ids)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "xoa lich su thanh cong",
  })
}

