const express = require("express");
const router = express.Router();
const controller = require("./owner.controller");

router.post("/register", controller.register);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.login);
module.exports = router;