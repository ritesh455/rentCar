const express = require("express");
const router = express.Router();
const controller = require("./common.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/logout", controller.logout);
router.get("/me", authMiddleware, controller.me);
router.get("/role", authMiddleware, controller.getRole);

module.exports = router;