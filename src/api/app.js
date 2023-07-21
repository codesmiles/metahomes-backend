const { Router } = require("express");
const app = Router();
const csrf = require("csurf");
const authRoutes = require("./Routes/public/auth.route");
const userRoutes = require("./Routes/protected/user.route");
const publicRoute = require("./Routes/public/public.route")
const passport = require("./Middlewares/passportAuth");
const errorHandler = require("./Middlewares/errorHandler");
const { serverFileUpload } = require("./Middlewares/fileUpload");
const { serverCors } = require("./Middlewares/cors");
const {serverLimiter} = require("./Middlewares/rateLimit");
const { serverCompression } = require("./Middlewares/compression");
const { serverSession } = require("./Middlewares/session");

// MIDDLEWARES
app.use(serverFileUpload, serverCors, serverCompression, serverSession,csrf());
app.use("/api", serverLimiter);

// ROUTES
app.use("/api/public", publicRoute);
app.use("/api/auth", authRoutes);
app.use(
  "/api/auth/user",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
app.use(errorHandler);

module.exports = app;