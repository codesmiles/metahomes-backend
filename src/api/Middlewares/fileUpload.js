const fileUpload = require("express-fileupload");


module.exports.serverFileUpload = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // cant accept images more than 50mb
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
  })