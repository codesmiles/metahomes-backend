const { mongoose } = require("../imports");
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    propertyId: {
      type: String,
      required: true,
      ref: "PropertyListing",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      min: 5,
    },
    LGA: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
