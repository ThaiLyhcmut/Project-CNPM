module.exports.ResposeError = (res, code, msg) => {
  return res.json({
    code: code,
    msg: msg
  })
}