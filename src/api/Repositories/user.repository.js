const {
  User,
  errorDey,
  PropertyDetails,
  PropertyLocation,
  PropertyPrice,
  logger
} = require("./imports");

module.exports.getUserById = async (id) => {
  const fetchUser = await User.findById(id);
  if (!fetchUser) {
    throw errorDey(404, "User not found", "Database Error");
  }
  return fetchUser;
};

module.exports.updateUserPassword = async (id, password) => {
  const passwordUpdated = await User.findByIdAndUpdate(id, { password });
  if (passwordUpdated) return true;
};

module.exports.updateUserProfile = async (id, data) => {};

const saveDataToDB = async (data, collection) => {
  logger.info(`Saving data To Database`)
  const newData = new collection(data);
  const validateError = newData.validateSync();
  if (validateError)
    throw logger.error(errorDey(500, validateError.message, "Database Error"));

  const savedData = await newData.save();
  return savedData;
};

module.exports.createPropertyDetails = async (data) => {
  return await saveDataToDB(data, PropertyDetails);
};

module.exports.createPropertyLocation = async (data) => {
  return await saveDataToDB(data, PropertyLocation);
};

module.exports.createPropertyCosts = async (data) => {
  return await saveDataToDB(data, PropertyPrice);
};
