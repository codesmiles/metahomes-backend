const session = require("express-session");


module.exports.serverSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     secure: false,
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24 * 7,
    // },
});