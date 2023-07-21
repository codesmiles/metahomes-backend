const { joi, validator } = require("./validator");

const changePasswordSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

exports.validateChangePassword = validator(changePasswordSchema);

const createPropertySchema = joi.object({
  userId: joi.string().required(),
  propertyType: joi.string().required(),
  propertyTitle: joi.string().required(),
  category: joi.string().required(),
  bedrooms: joi.string().required(),
  bathrooms: joi.string().required(),
  toilets: joi.string().required(),
  price: joi.string().required(),
  denomination: joi.string().required(),
  append: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  address: joi.string().required(),
  LGA: joi.string().required(),
  image: joi
    .alternatives()
    .try(joi.object(), joi.array().items(joi.object()))
    .required(),
  isFurnished: joi.boolean().truthy("on").falsy("").default(false),
  isServiced: joi.boolean().truthy("on").falsy("").default(false),
  isNewlyBuilt: joi.boolean().truthy("on").falsy("").default(false),
  installmentPayment: joi.boolean().truthy("on").falsy("").default(false),
  description: joi.string().required(),
});

exports.validateCreateProperty = validator(createPropertySchema);
