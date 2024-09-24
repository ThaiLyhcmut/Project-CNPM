const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const PrintSchema = new mongoose.Schema({
  id_printer: String,
  gmail_printer: String,
  customers: [
    {
      id_customer: String,
      gmail_customer: String,
      file_link: [{ type: String }]
    }
  ]
});

const Print = mongoose.model(
  'Print',
  PrintSchema,
  'prints'
)

module.exports = Print