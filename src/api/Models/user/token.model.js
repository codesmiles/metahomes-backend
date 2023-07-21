const {mongoose} = require("../imports");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },

},{timestamps:true});
const token = mongoose.model("token", tokenSchema);
module.exports = token;
