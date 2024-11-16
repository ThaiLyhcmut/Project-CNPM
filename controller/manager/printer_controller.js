const Printer = require("../../model/Printer")

module.exports.postPrintController = async (req, res) => {
  const newPrint = req.body
  const record = new Printer(newPrint)
  await record.save()
  res.json({
    code: "success",
    msg: "tao may in thanh cong",
  })
} 

module.exports.getPrintStatusController = async (req, res) => {
  find = {
    deleted: false,
    status: "active"
  }
  sort = {}
  if(req.query.cs){
    find.cs = parseInt(req.query.cs)
  }
  if(req.query.price){
    sort.price = parseInt(req.query.price)
  }
  const printer = await Printer.find(find).sort(sort)
  res.json({
    listPrinter: printer
  })
  res.json({
    code: "success",
    msg: "lay may in thanh cong",
    printer: printer
  })
}

module.exports.patchChangeMuiltiPrintController = async (req, res) => {
  IDs = req.body.ids
  await Printer.updateMany({
    "_id": IDs,
  }, {
    "status": req.body.status
  })
  res.json({
    "code": "success",
    "msg": "Cập nhật thành công"
  })
}

module.exports.patchChangePrinterController = async (req, res) => {
  const id = req.params.id
  if(!id){
    res.json({
      "code": "error",
      "msg": "id m dau"
    })
    return
  }
  await Printer.updateOne({
    "_id": id
  }, req.body)
  res.json({
    "code": "success",
    "msg": "update may in thanh cong"
  })
}

module.exports.deletePrinterController = async (req, res) => {
  
}