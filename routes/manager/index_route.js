const printerRoute = require("./printerRoute")
const accountRoute = require("./accountRoute")
const fileRoute = require("./fileRoute")
const systemPrefix = require("../../config/system")
const middlewares = require("../../middlewares/manager/auth")
module.exports = (app) => {
  app.use(`/api${systemPrefix.prefixAdmin}`, accountRoute)
  app.use(`/api${systemPrefix.prefixAdmin}`,middlewares.requireAuth, printerRoute)
  app.use(`/api${systemPrefix.prefixAdmin}`,middlewares.requireAuth, fileRoute)
}