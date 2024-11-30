const EWallet = require("../model/E-wallets")

// Insert e-wallet
module.exports.InsertEWallet = async (data) => {
  const record = new EWallet(data)
  return await record.save()
}

// Get e-wallet
module.exports.GetEWalletByAccountId = async (id) => {
  return await EWallet.findOne({
    accountId: id
  })
}

// Update e-wallet
module.exports.UpdateEWalletByAccountId = async (id, balance) => {
  return await EWallet.updateOne({
    accountId: id
  }, {
    $inc: {
      balance: balance
    }
  })
}


module.exports.UpdateEWalletPaper = async (id, balance, balancePaper) => {
  return await EWallet.updateOne({
    _id: id
  }, {
    balance: balance,
    balancePaper: balancePaper
  })
}