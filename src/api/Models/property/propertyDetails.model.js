const { mongoose } = require("../imports");
const { Schema } = mongoose;

const propertyDetailsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      // ref: ["Developers", "Agents"],
    },
    propertyType: {
      //type = enum
      type: String,
      required: true,
    },
    propertyTitle: {
      // title
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["rent", "sale", "hostel", "shortlet"],
    },
    bedrooms: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: String,
      required: true,
    },
    toilets: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.Mixed,
      required: true,
    },
    isFurnished: {
      type: Boolean,
      required: true,
    },
    isServiced: {
      type: Boolean,
      required: true,
    },
    isNewlyBuilt: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const PropertyDetails = mongoose.model("PropertyDetail", propertyDetailsSchema);
module.exports = PropertyDetails;
