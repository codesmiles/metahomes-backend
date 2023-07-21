const {
  authService,
  validateSignUp,
  passport,
  jwt,
  validateForgetPassword,
  validateResetPassword,
  logger,
} = require("./imports");

module.exports.signUp = async (req, res, next) => {
  try {
    logger.info("Sign-Up route");
    // validating the incoming data
    const dataValidated = await validateSignUp(await req.body);  

    const response = await authService.signUpService(dataValidated);
    logger.info("Email sent successfully");
    logger.debug("Remove the response");
    return res.json({
      success: true,
      response,
    })
    
  } catch (error) {
    next(error);
  }
};

module.exports.saveUser = async (req, res, next) => {
try{
  logger.info("Save-User route");
  const response = await authService.saveUserService(req.params.tokenData);

    logger.info("Successfully registered");
    logger.debug("Prevent returning user's data as response")
    return res.json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }

  
};

module.exports.login = async (req, res, next) => {
  logger.info("Login Route...")
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) return next(err || "user Unavailable");

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        //   pay attention here
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        logger.info("Login Successful");
        return res.json({
          success: true,
          ...info,
          token,
        });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

module.exports.forgetPassword = async (req, res, next) => {
  logger.info("Forget Password Route");
  try {
    const dataValidated = await validateForgetPassword(await req.body);

    const response = await authService.forgetPasswordService(dataValidated);
    
    logger.debug("Remove the Response");
    return res.json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  logger.info("Reset Password Route")
  try {
    const queryDataValidated = await validateResetPassword({
      token: await req.params.token,
      password: await req.body.password,
    });

    const response = await authService.resetPasswordService(queryDataValidated);

    logger.info("Password Reset Successfully");
    logger.debug("remove the response related to the password");
    return res.json({
      success: true,
      response,
    });
  } catch (err) {
    next(err);
  }
};
