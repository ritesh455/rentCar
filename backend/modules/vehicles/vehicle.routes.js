const express = require("express");
const router = express.Router();
const controller = require("./vehicle.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, controller.addVehicle);
router.get("/my", authMiddleware, controller.getMyVehicles);
// PUBLIC routes
router.get("/public", controller.getPublicVehicles);
router.get("/public/:id", controller.getPublicVehicleById);
router.put("/:id", authMiddleware, controller.updateVehicle);
router.patch("/:id/status", authMiddleware, controller.updateVehicleStatus);

module.exports = router;
