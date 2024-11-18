const Printer = require("../../model/Printer")
const Account = require("../../model/Account")
const EWallet = require("../../model/E-wallets")
const File = require("../../model/File")
const History = require("../../model/History")
const Field = require("../../model/Field")


module.exports.printerController = async (req, res) => {
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
}

module.exports.getDetailController = async (req, res) => {
  const id = req.params.id
  if(!id){
    res.json({
      "code": "error",
      "msg": "chua co id"
    })
  }
  const printer = await Printer.findOne({
    "_id": id
  })
  res.json({
    "code": "error",
    "msg": "lay thong cong may in",
    "printer": printer
  })
}

module.exports.postPrinterController = async (req, res) => {
  const PrinterId = req.body.printerId
  const FileId = req.body.fileId
  const file = await File.findOne({
    "_id": FileId
  })
  if(!file){
    res.json({
      "code": "error",
      "msg": "không tìm thấy file"
    })
    return
  }
  const printer = await Printer.findOne({
    "_id": PrinterId,
    "deleted": false,
    "status": "active"
  })
  if (!printer){
    res.json({
      "code": "error",
      "msg": "không tìm thấy may in"
    })
    return
  }
  const account  = res.locals.account
  const eWallet = await EWallet.findOne({
    accountId: account.id
  })
  if (!eWallet) {
    res.json({
      "code": "error",
      "msg": "Khong tim thay e-wallet"
    })
    return
  }
  priceNew = file.pages*(printer.price* parseFloat((1 - printer.discountpercent/100).toFixed(2)))
  if(eWallet.balance < priceNew){
    res.json({
      "code": "error",
      "msg": "Bạn nghèo tôi cũng nghèo cố gắng nạp tiền vào để in nhe"
    })
    return
  }
  balanceNew = eWallet.balance - priceNew
  await EWallet.updateOne({
    "_id": eWallet.id
  }, {
    balance: balanceNew
  })
  res.json({
    "code": "success",
    "msg": "Bạn đã in thành công",
    "balanceNew": balanceNew
  })
  const dataHistory = {
    accountId: account.id,
    cs: printer.cs,
    location: printer.location,
    price: (printer.price* parseFloat((1 - printer.discountpercent/100).toFixed(2))),
    pages: file.pages,
    totle: priceNew,
    balance: balanceNew,
    linkPath: file.linkPath,
    status: "doing",
    printerId: printer.id
  }
  const record = new History(dataHistory)
  await record.save()

  const data = {
    accountId: account.id,
    transaction: "In",
    amount: priceNew,
    balance: balanceNew,
    historyId: dataHistory.id
  }
  const record2 = new Field(data)
  await record2.save()
}