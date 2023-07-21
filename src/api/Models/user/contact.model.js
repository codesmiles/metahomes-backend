const {mongoose} = require("../imports");
const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "user",
    },
    officeNumber: {
      type: String,
      required: true,
      min: 9,
      max: 14,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
