const logger = require("../Loggers/index");
const errorDey = require("../Helpers/errorDey");
const User = require("../Models/user/user.model");
const Token = require("../Models/user/token.model")
const Contact = require("../Models/user/contact.model");
const Referral = require("../Models/user/referral.model");
const PropertyPrice = require("../Models/property/propertyPrice.model");
// const propertyImage = require("../models/property/propertyImage.model");
const PropertyDetails = require("../Models/property/propertyDetails.model");
const PropertyLocation = require("../Models/property/propertyLocation.model");

module.exports = {
    User,
    Referral,
    Contact,
    errorDey,
    Token,
    PropertyDetails,
    PropertyLocation,
    PropertyPrice,
    logger
}