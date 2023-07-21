const NodeCache = require("node-cache");
const logger = require("../api/Loggers/index");
const params = { stdTTL: 100, deleteOnExpire: true, checkperiod: 120 };

const myCache = new NodeCache(params);
// Remove when necessary
myCache.on("set", function (key, value) {
  logger.info(`cache saved successfully`);
});

myCache.on("expired", function (key, value) {
  logger.info(`${key} expired`);
});
module.exports = myCache;