const { errorDey, User, Contact, Referral, logger } = require("../imports");

module.exports.checkEmail = async (email) => {
  logger.info("checking Email...");
  const userEmail = await User.findOne({ email });
  return userEmail;
};

module.exports.registerUser = async (data) => {
  const { name, email, password, phone, role } = data;

  const userData = new User({
    name,
    email,
    password,
    role,
    phone,
  });

  const validateError = userData.validateSync();
  // check for mongoose validation errors
  if (validateError)
    throw errorDey(409, validateError.message, "MongoDB Validation Error");

  const newUser = await userData.save();

  logger.info("User data saved");
  return {
    message: "Account Created sucessfully ✅",
    generic: {
      id: newUser._id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      contact: newUser.phone,
      createdAt: newUser.createdAt,
      updateAt: newUser.updatedAt,
    },
  };
};

module.exports.registerDeveloper = async (userId, officeNumber) => {
  // developer
  const contactData = new Contact({
    userId,
    officeNumber,
  });
  const contactError = contactData.validateSync();
  if (contactError) {
    throw errorDey(409, contactError.message, "MongoDB Validation Error");
  }
  const officeContact = await contactData.save();
  logger.info("Developer Data Saved")
  return officeContact;
};

module.exports.registerAgent = async (userId, referredBy, officeNumber) => {
  // referrer data
  const referralData = new Referral({
    userId,
    referredBy,
  });
  const referralDataError = referralData.validateSync();
  if (referralDataError) {
    throw errorDey(409, referralDataError.message, "MongoDB Validation Error");
  }
  const referralDetails = await referralData.save();
  logger.info("Agent Data Saved")

  // contact data
  const officeContact = await this.registerDeveloper(userId, officeNumber);
  return {
    referralDetails,
    officeContact,
  };
};

module.exports.forgetPassword = async (email) => {
  confirmMail = await this.checkEmail(email);
  if (!confirmMail)
    throw errorDey(409, "user does not exist", "Database Error");

  return { id: confirmMail._id, pwd: confirmMail.password};
};

module.exports.getUserById = async (_id) => {
  logger.info("Retrieving User...");
  const getUser = await User.findById({ _id });
  return { id: getUser._id, password: getUser.password };
};

module.exports.resetPassword = async (password, _id) => {
  logger.info("Resetting Password");
  await User.findOneAndUpdate({ _id }, { password });
  logger.info("Password reset successful");
  return "Password reset successful";
};
