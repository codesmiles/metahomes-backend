const { buildDevLogger, buildProdLogger } = require("../../Config/logger");

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;


// const logger = require("./src/api/loggers/index")
// logger.info("text info",{meta1:"meta1"})
// logger.warn("text warn")
// logger.error("text error")
// logger.debug("text debug")
// logger.error(new Error("something went wrong"));
  