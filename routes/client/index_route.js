const accountRoute = require("./accountRoute")
const printerRoute = require("./printerRoute")
const fileRoute = require("./fileRoute")
const eWalletRoute = require("./e-walletRoute")
const historyRoute = require("./historyRoute")
const MiddlewareAuth = require("../../middlewares/client/auth")
module.exports = (app) => {
  app.use('/api/account', accountRoute)
  app.use('/api/printer', MiddlewareAuth.requireAuth , printerRoute)
  app.use('/api/file', MiddlewareAuth.requireAuth, fileRoute)
  app.use('/api/e-wallet', MiddlewareAuth.requireAuth, eWalletRoute)
  app.use('/api/history', MiddlewareAuth.requireAuth, historyRoute)
}