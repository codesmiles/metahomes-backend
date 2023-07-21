// MOST LIKELY BE USELESS UNTIL FURTHER NOTICE
const { Token, errorDey,logger } = require("../imports");

module.exports.saveToken = async (token) => {
  logger.info("Saving Token...")
  const userToken = new Token({ ...token });
  const validateError = userToken.validateSync();
  if (validateError)
    throw errorDey(409, validateError.message, "MongoDB Validation Error");

  const newToken = await userToken.save();
  return newToken;
}
 
module.exports.registerToken = async (id, token) => {
  logger.info("checking Token...")
  const existed = await Token.findOne({ userId: id });
  if (existed) {
    const updated = existed.updateOne({ token })
    return updated;
  }
  return this.saveToken({ userId: id, token });
  

};

module.exports.checkToken = async (token) => {
  logger.info("Validating Token...");
  const userToken = await Token.findOne({ token });  
  if (!userToken) throw errorDey(409, "Token does not exist", "Database Error");
  
  return userToken.userId;
};
 
module.exports.deleteToken = async (token) => {
  logger.info("Deleting Token...");
  const deleteToken = await Token.findOneAndDelete({ token });
  if (!deleteToken) throw errorDey(409, "Token does not exist", "Database Error");
  logger.info(`Token Deleted`)
  return `Token Deleted`
}