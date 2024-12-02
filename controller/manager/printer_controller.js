const { isValidObjectId } = require("mongoose")
const { GetPrinter, InsertPrinter, UpdatePrinters, GetPrinterById, UpdatePrinter, DeletePrinterById } = require("../../service/printer_service")

module.exports.postPrintController = async (req, res) => {
  try {
    await InsertPrinter(req.body)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    code: "success",
    msg: "tao may in thanh cong",
  })
} 

module.exports.getPrintStatusController = async (req, res) => {
  find = {
    deleted: false,
  }
  sort = {}
  if(req.query.cs){
    find.cs = parseInt(req.query.cs)
  }
  if(req.query.price){
    sort.price = parseInt(req.query.price)
  }
  let printer
  try {
    printer = await GetPrinter(find, sort)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    code: "success",
    msg: "lay may in thanh cong",
    printer: printer
  })
}


module.exports.getDetailController = async (req, res) => {
  const id = req.params.id
  if(!id || !isValidObjectId(id)){
    res.json({
      "code": "error",
      "msg": "chua co id"
    })
  }
  let printer
  try {
    printer = await GetPrinterById(id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "error",
    "msg": "lay thong cong may in",
    "printer": printer
  })
}

module.exports.patchChangeMuiltiPrintController = async (req, res) => {
  ids = req.body.ids
  if (!req.body.status){
    res.json({
      "code": "eroor"
    })
    return
  }
  if (ids.length < 0) {
    res.json({
      "code": "eroor"
    })
    return
  }
  try {
    await UpdatePrinters(ids, req.body.status)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "Cập nhật thành công"
  })
}

module.exports.patchChangePrinterController = async (req, res) => {
  const id = req.params.id
  if(!id || !isValidObjectId(id)){
    res.json({
      "code": "error",
      "msg": "id m dau"
    })
    return
  }
  try{
    await UpdatePrinter(id, req.body)
  }
  catch (error) {
    return res.json({
      "code": "error"
    })
  }
  res.json({
    "code": "success",
    "msg": "update may in thanh cong"
  })
}

module.exports.deletePrinterController = async (req, res) => {
  const id = req.params.id
  if(!id || !isValidObjectId(id)){
    res.json({
      "code": "error",
      "msg": "id m dau"
    })
    return
  }
  try {
    await DeletePrinterById(id)
  }
  catch (e) {
    return res.json({
      "code": "error"
    })
  } 
  res.json({
    "code": "success",
    "msg": "xoa may in thanh cong"
  })
}
