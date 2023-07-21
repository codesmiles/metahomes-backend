const errorDey = (code, message, name) => {
  const error = new Error(message);
  error.code = code;
  error.name = name;
  return error;
};

module.exports = errorDey