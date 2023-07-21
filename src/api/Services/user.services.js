const { bcrypt, userRepository, errorDey } = require("./imports");

module.exports.changePasswordService = async ({ validated, userID }) => {
  const { oldPassword, newPassword } = validated;
  const user = await userRepository.getUserById(userID);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return errorDey("Incorrect password", 401);

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const query = await userRepository.updateUserPassword(
    user._id,
    hashedPassword
  );
  if (!query) errorDey("Password change failed", 500);
  return "Password changed successfully";
};

module.exports.updateProfileService = async ({ req, userID }) => {};

module.exports.createPropertyService = async (data) => {
  const {
    propertyType,
    propertyTitle,
    category,
    bedrooms,
    bathrooms,
    toilets,
    price,
    denomination,
    installmentDuration,
    city,
    state,
    address,
    LGA,
    image,
    isFurnished,
    isServiced,
    isNewlyBuilt,
    installmentPayment,
    description,
    userId,
  } = data;

  const propertyDetails = {
    userId,
    propertyType,
    propertyTitle,
    category,
    bedrooms,
    bathrooms,
    toilets,
    image,
    isFurnished,
    isServiced,
    isNewlyBuilt,
    description,
  };

  const savePropertyDetails = await userRepository.createPropertyDetails(
    propertyDetails
  );

  const propertyLocation = {
    propertyId: savePropertyDetails._id,
    city,
    state,
    address,
    LGA,
  };
  const savePropertyLocation = await userRepository.createPropertyLocation(
    propertyLocation
  );

  const propertyCosts = {
    propertyId: savePropertyDetails._id,
    price,
    denomination,
    installmentDuration,
    installmentPayment,
  };
  const savePropertyCosts = await userRepository.createPropertyCosts(
    propertyCosts
  );

  if (!savePropertyDetails || !savePropertyLocation || !savePropertyCosts) {
    return logger.error(errorDey("Property creation failed", 500));
  }

  return {
    message: "Property created successfully",
    propertyDetails: savePropertyDetails,
    propertyLocation: savePropertyLocation,
    propertyCosts: savePropertyCosts
  };
};
