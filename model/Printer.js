const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const PrinterSchema = new mongoose.Schema({
  cs: {
    type: Number,
    default: 1
  },
  brand: String,
  modle: String,
  description: String,
  location: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "active"
  },
  type: {
    type: String,
    default: "A3"
  },
  deleted: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true,
  }
);

const Printer = mongoose.model(
  'Printer',
  PrinterSchema,
  'printers'
)

module.exports = Printer