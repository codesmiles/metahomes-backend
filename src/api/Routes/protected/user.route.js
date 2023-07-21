const userController = require("../../Controllers/user.controller");
const { Router } = require("express");
const router = Router();

// USER
router.get("/profile", userController.viewProfile);
router.post("/change-password", userController.changePassword);
router.post("/update-profile", userController.updateProfile);

// DASHBOARD
// post property
// my listings
// my profile
// subscriptions

// my messages
// favourite
// stats

// PROPERTY
router.post("/add-property", userController.createProperty);
module.exports = router;
