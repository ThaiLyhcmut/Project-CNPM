const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const FileSchema = new mongoose.Schema({
  name: String,
  link: String,
  linkPath: String,
  accountId: String,
  pages: Number,
  length: Number,
},{
    timestamps: true,
  }
)

const File = mongoose.model(
  'File',
  FileSchema,
  'files'
)

module.exports = File