const Printer = require("../../model/Printer")
const Account = require("../../model/Account")


module.exports.printerController = async (req, res) => {
  find = {
    deleted: false
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