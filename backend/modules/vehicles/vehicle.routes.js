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

// PUBLIC
router.get("/public", controller.getPublicVehicles);
router.get("/public/:id", controller.getPublicVehicleById);

// UPDATE
router.put("/:id", authMiddleware, controller.updateVehicle);
router.patch("/:id/status", authMiddleware, controller.updateVehicleStatus);

// IMAGE SERVE
router.get("/:id/images/:index", controller.serveImage);

router.post(
  "/:id/images",
  authMiddleware,
  upload.array("images", 10),
  controller.uploadVehicleImages
);



module.exports = router;
