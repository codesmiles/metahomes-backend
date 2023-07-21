const { joi, validator } = require("./validator");

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: joi.string().required(),
  confirmPassword: joi.ref("password"),
  role: joi.string().required(),
  referredBy: joi.string(),
  officeNumber: joi.string(),
});

exports.validateSignUp = validator(signUpSchema);

const forgetPasswordSchema = joi.object({
  email: joi.string().email().required(),
});
exports.validateForgetPassword = validator(forgetPasswordSchema);

const resetPasswordSchema = joi.object({
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  token: joi.string().required(),
});
exports.validateResetPassword = validator(resetPasswordSchema);


const updateProfileSchema = joi.object({
  
});