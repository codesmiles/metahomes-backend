const cors = require("cors");

//  apply to all requests
module.exports.serverCors = cors({
    origin: process.env.CORS_ORIGIN, //the url of the client
    methods: ["GET", "POST"], //didnt add patch and PUT
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Content-Type', 'Authorization'],
    // optionsSuccessStatus: 200
});
