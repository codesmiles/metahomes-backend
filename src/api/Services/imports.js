const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../Loggers/index");
const errorDey = require("../Helpers/errorDey")
const sendEmail = require("../Helpers/sendEmail");
const cloudinary = require("../../Config/cloudinary");
const userRepository = require("../Repositories/user.repository");
const { cacheDataWithExpiry,takeData} = require("../Helpers/cacheClient");
const authUserRepository = require("../Repositories/auth/authUser.repository");
const authUserTokenRepository = require("../Repositories/auth/authUserToken.repository");

module.exports = {
  bcrypt,
  authUserRepository,
  authUserTokenRepository,
  uuid,
  sendEmail,
  errorDey,
  userRepository,
  cloudinary,
  logger,
  jwt,
  cacheDataWithExpiry,
  takeData
};
