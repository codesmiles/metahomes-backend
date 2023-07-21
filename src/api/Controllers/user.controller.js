const {
  validateChangePassword,
  userService,
  validateCreateProperty,
  uploadImage,
  logger,
} = require("./imports");

module.exports.viewProfile = async (req, res, next) => {
  logger.info("View Profile Route")
  logger.info("Incomplete")
  try {
    // view user profile and necessary data
    return res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.headers.authorization,
      reqIsAuththenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports.changePassword = async (req, res, next) => {
  logger.info("Change Password Route");
  logger.debug("When a user is logged in a the use of old password is void")
  try {
    const validated = await validateChangePassword(await req.body);
    const response = await userService.changePasswordService({
      validated,
      userID: req.user,
    });

    return res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  logger.info("Update Profile Route")
  logger.debug("Incomplete")
  try {
    const response = await userService.updateProfileService({
      req,
      userID: req.user,
    });
    return res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    next(err);
  }
};

// Property
module.exports.createProperty = async (req, res, next) => {
  logger.info('Add Property Route')
  try {
    const { files, body, user } = await req;
    if (!files || !body)
      return next({ message: "No files/images/fields were uploaded." });

    const validated = await validateCreateProperty({
      userId: user,
      image: files,
      ...body,
    });

    const filesUploaded = await uploadImage(files);

    validated.image = filesUploaded;
    const response = await userService.createPropertyService(validated);
    logger.info(`Property saved successfully`)
    logger.debug("Remove those response poperty data")
    return res.json({
      success: true,
      response,
    });
  } catch (err) {
    next(err);
  }
};
