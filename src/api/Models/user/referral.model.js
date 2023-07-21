const {mongoose} = require("../imports");
const { v4: uuidv4 } = require("uuid");

const referralSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "user",
  },
  referredBy: {
    type: String,
    required: false,
    ref: "user",
  },

  generatedReferralCode: {
    type: String,
    required: true,
    default: uuidv4().split("-").join("").slice(0, 6),
  },
},{timestamps:true});
const Referral = mongoose.model("referral", referralSchema);
module.exports = Referral;
