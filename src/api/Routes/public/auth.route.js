const { Router } = require("express");
const authController = require("../../Controllers/auth.controllers")
const {signUpLimiter} = require("../../Middlewares/rateLimit")
const router = Router();

router.post("/sign-up", signUpLimiter, authController.signUp);
router.post("/save/:tokenData", authController.saveUser);

// TO DO
// install compression package for compressor
// work on dedicated VPS
// Implement CAPTCHA TO WHERE NECESSARY with axios

router.post("/login", authController.login);

router.post("/forget-password", authController.forgetPassword)
router.post("/reset-password/:token", authController.resetPassword)  
module.exports = router;
