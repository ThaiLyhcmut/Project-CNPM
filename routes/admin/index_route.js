const addPrint = require("./addprint")
const systemPrefix = require("../../config/system")
module.exports = (app) => {
  app.use(`/api${systemPrefix.prefixAdmin}`, addPrint)
}