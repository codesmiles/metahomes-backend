const mongoose = require("mongoose");
const logger = require("../api/Loggers/index")
// connect to mongoose
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) {
    console.log(err);
  } else {
    logger.info(`Mongoose Connection has been established`);
  }
});

module.exports = { mongoose };
