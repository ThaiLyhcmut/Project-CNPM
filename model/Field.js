const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const FieldSchema = new mongoose.Schema({
  accountId: String,
  transaction: String,
  amount: Number,
  balance: Number,
  historyId: String
},{
    timestamps: true,
  }
)

const Field = mongoose.model(
  'Field',
  FieldSchema,
  'field'
)

module.exports = Field