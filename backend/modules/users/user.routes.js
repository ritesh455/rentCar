const express = require("express");
const router = express.Router();
const controller = require("./user.controller");

router.post("/register", controller.register);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/me", controller.me);

module.exports = router;
