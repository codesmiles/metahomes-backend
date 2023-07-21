const rateLimit = require("express-rate-limit");
  
module.exports.serverLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
	legacyHeaders: false, 
});

module.exports.signUpLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5,
	message:`Too many request, please try again after an hour`,
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports.csrfTokenLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10,
	message: `Too many csrf token requests from this IP, please try again after an hour`,
	standardHeaders: true,
	legacyHeaders: false,
})