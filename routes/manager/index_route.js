const printerRoute = require("./printerRoute")
const accountRoute = require("./accountRoute")
const fileRoute = require("./fileRoute")
const historyRoute = require("./historyRoute")
const systemPrefix = require("../../config/system")
const middlewares = require("../../middlewares/manager/auth")
module.exports = (app) => {
  app.use(`${systemPrefix.prefixManager}/api`, accountRoute)
  app.use(`${systemPrefix.prefixManager}/api/history`, middlewares.requireAuth, historyRoute)
  app.use(`${systemPrefix.prefixManager}/api/printer`,middlewares.requireAuth, printerRoute)
  app.use(`${systemPrefix.prefixManager}/api/file`,middlewares.requireAuth, fileRoute)
}