const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");

router.post("/register", controller.register);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.login);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
