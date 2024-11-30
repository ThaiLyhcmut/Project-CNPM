const { GetPrinter } = require("../../service/printer_service")
const { GetFileById } = require("../../service/file_service")
const { GetEWalletByAccountId } = require("../../service/e-wallet_service")


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
  const printer = await GetPrinter(find, sort)
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
  const printer = await GetPrinter(id)
  res.json({
    "code": "error",
    "msg": "lay thong cong may in",
    "printer": printer
  })
}

module.exports.postPrinterController = async (req, res) => {
  const PrinterId = req.body.printerId
  const FileId = req.body.fileId
  const file = GetFileById(FileId)
  if(!file){
    res.json({
      "code": "error",
      "msg": "không tìm thấy file"
    })
    return
  }
  const printer = await GetPrinterById(PrinterId)
  if (!printer){
    res.json({
      "code": "error",
      "msg": "không tìm thấy may in"
    })
    return
  }
  const account  = res.locals.account
  const eWallet = await GetEWalletByAccountId(account.id)
  if (!eWallet) {
    res.json({
      "code": "error",
      "msg": "Khong tim thay e-wallet"
    })
    return
  }
  let paper = parseInt((file.pages + 1)/2)
  if(printer.type == "A3"){
    paper = file.pages
  }
  if(eWallet.balancePaper < paper){
    res.json({
      "code": "error",
      "msg": "Bạn nghèo tôi cũng nghèo cố gắng nạp tiền vào để in nhe"
    })
    return
  }
  balancePaperNew = eWallet.balancePaper - paper
  await UpdateEWalletPaper(eWallet.id, eWallet.balance, balancePaperNew)
  res.json({
    "code": "success",
    "msg": "Bạn đã in thành công",
    "balancePaper": balancePaperNew
  })
  const dataHistory = {
    accountId: account.id,
    cs: printer.cs,
    location: printer.location,
    pages: file.pages,
    totle: paper,
    balancePaperNew: balancePaperNew,
    linkPath: file.linkPath,
    status: "doing",
    printerId: printer.id
  }
  await InsertHistory(dataHistory)
}