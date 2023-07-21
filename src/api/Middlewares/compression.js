const compression = require("compression");

module.exports.serverCompression = compression(
    {
        level: 6,
        threshold: 10 * 1000,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                // don't compress responses with this request header
                return false;
            }
            // fallback to standard filter function
            return compression.filter(req, res);
        },
    }
);