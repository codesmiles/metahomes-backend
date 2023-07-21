const joi = require("joi");

// create a closure to hold the schema
const validator = (schema) => async (payload) =>
  await schema.validateAsync(payload, { abortEarly: false });

module.exports = {
    validator,
    joi
}