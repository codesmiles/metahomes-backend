const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertyPriceSchema = new Schema({
    propertyId: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    denomination: {
        type: String,
        required: true,
        enum:["naira","dollar"],
        default:"naira"
    },
    installmentPayment: {
        type: Boolean,
        required: true,
    },
    append: {
        type: String,
        required: true,
        enum: ["monthly", "quarterly", "yearly","daily","sqm"],
        default: "monthly"
    }
}, { timestamps: true })

const PropertyPrice = mongoose.model("PropertyPrice", propertyPriceSchema);
module.exports = PropertyPrice;