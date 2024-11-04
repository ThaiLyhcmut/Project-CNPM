const accountRouter = require("./accountRouter")
const printerRoute = require("./printerRoute")
const fileRoute = require("./fileRoute")
const eWalletRoute = require("./e-walletRoute")
const MiddlewareAuth = require("../../middlewares/client/auth")
module.exports = (app) => {
  app.use('/api/account', accountRouter)
  app.use('/api/printer', MiddlewareAuth.requireAuth , printerRoute)
  app.use('/api/file', MiddlewareAuth.requireAuth, fileRoute)
  app.use('/api/e-wallet', MiddlewareAuth.requireAuth, eWalletRoute)
}