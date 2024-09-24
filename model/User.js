const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const UserSchema = new mongoose.Schema({
  gmail: String,
  password: String,
  role: String,
  mssv: String,
  name: String,
})

const User = mongoose.model(
  'User',
  UserSchema,
  'users'
)

module.exports = User