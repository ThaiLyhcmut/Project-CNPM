const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const EWalletSchema = new mongoose.Schema({
  accountId: String,
  balance: Number,
  mssv: String,
  balancePaper: Number,
},{
  timestamps: true,
})


const EWallet = mongoose.model(
  'E-wallet',
  EWalletSchema,
  'e-wallets'
)

module.exports = EWallet