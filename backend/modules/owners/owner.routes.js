const express = require("express");
const router = express.Router();
const controller = require("./owner.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 } // Enforce 2 MB limit
});
router.post("/register", upload.single("image"), controller.register);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.login);
module.exports = router;