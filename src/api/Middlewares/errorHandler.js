const logger = require("../Loggers/index");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    logger.error(err.details.map((val) => val.message) || err.message);
    return res.status(400).json({
      success: false,
      response: {
        title: err.name,
        message: err.details.map((val) => val.message),
      },
    });
  }
  
  // range error
  if (err.code === 11000 || err.name === "CastError") {
    logger.error(err);
    return res.status(400).json({
      success: false,
      response: {
        title: err.name,
        message: err.message,
      }, 
    });
  }
  
  if (err.code === 500 || err.code === undefined) { 
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: err.details || err.message,
    });
  }
  
  // handling bad csrf token
  if (err.code === "EBADCSRFTOKEN") {
    logger.error(err);
    return res.status(403).json({
      success: false,
      response: {
        title: err.code,
        message: err.message,
      },
    });
  }
  
  
  logger.error(err)
  return res.status(err.code).json({
        success: false,
        response: {
            title: err.name,
            message: err.message,
        }
  }); 
}


module.exports = errorHandler;