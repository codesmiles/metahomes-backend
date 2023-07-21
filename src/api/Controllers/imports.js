const authService = require("../Services/auth.services");
const {
  validateSignUp,
  validateForgetPassword,
  validateResetPassword,
} = require("../Validations/auth.validation");
const jwt = require("jsonwebtoken");
const passport = require("../Middlewares/passportAuth");
const errorDey = require("../Helpers/errorDey");
const userService = require("../Services/user.services");
const { validateChangePassword, validateCreateProperty } = require("../Validations/user.validation");
const { uploadImage } = require("../Services/upload.service");
const logger = require("../Loggers/index")

module.exports = {
  authService,
  jwt,
  passport,
  errorDey,
  validateSignUp,
  validateForgetPassword,
  validateResetPassword,
  userService,
  validateChangePassword,
  validateCreateProperty,
  uploadImage,
  logger
};
