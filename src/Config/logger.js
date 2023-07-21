const {format,createLogger,transports} = require("winston");
const { timestamp, combine, printf, colorize, errors, json } = format;


const buildDevLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}: ${stack || message}`;
    });

return createLogger({
    level: 'debug',    
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({stack:true}),
    logFormat
  ),
    transports: [ new transports.Console()],
});
    
}


const buildProdLogger = () => {
    return createLogger({
        level: "info",
        format: combine(
            timestamp(),
            errors({ stack: true }),
            json()
  ),
//   defaultMeta: { service: 'user-service' },
    transports: [ new transports.Console()],
});
    
}

module.exports = {buildDevLogger, buildProdLogger};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
