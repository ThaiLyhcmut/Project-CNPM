const Printer = require("../model/Printer")

// Get Printer
module.exports.GetPrinter = async (find, sort) => {
  return await Printer.find(find).sort(sort)
}

module.exports.GetPrinterById = async (id) => {
  return await Printer.findOne({
    _id: id,
    deleted: false,
    status: "active"
  })
}

// Insert Printer
module.exports.InsertPrinter = async (data) => {
  const record = new Printer(data)
  return await record.save()
}


// Update Printer
module.exports.UpdatePrinters = async (ids, status) => {
  return await Printer.updateMany({
    _id: ids,
  }, {
    status: status
  })
}

module.exports.UpdatePrinter = async (id, data) => {
  return await Printer.updateOne({
    _id: id
  }, data)
}

// Delete Printer
module.exports.DeletePrinterById = async (id) => {
  return await Printer.deleteOne({
    _id: id
  })
}