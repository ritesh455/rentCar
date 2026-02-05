const express = require("express");
const router = express.Router();
const controller = require("./vehicle.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 } // 2 MB limit per file
});

// Configure Multer to expect specific field names
const vehicleUploads = upload.fields([
  { name: 'rc', maxCount: 1 },
  { name: 'noc', maxCount: 1 }
]);

router.post("/", authMiddleware, vehicleUploads, controller.addVehicle);
router.get("/my", authMiddleware, controller.getMyVehicles);
// PUBLIC routes
router.get("/public", controller.getPublicVehicles);
router.get("/public/:id", controller.getPublicVehicleById);
router.put("/:id", authMiddleware, controller.updateVehicle);
router.patch("/:id/status", authMiddleware, controller.updateVehicleStatus);

module.exports = router;
