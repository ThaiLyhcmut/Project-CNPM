const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const AccountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  avatar: String,
  role: String,
},{
  timestamps: true,
})

const Account = mongoose.model(
  'Account',
  AccountSchema,
  'accounts'
)

module.exports = Account