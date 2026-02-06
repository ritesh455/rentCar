const express = require("express");
const router = express.Router();
const controller = require("./admin.controller");
const adminAuth = require("./admin.middleware");

// login
router.post("/login", controller.login);
// create admin (protected)
router.post("/create", adminAuth, controller.createAdmin);

// VEHICLE VERIFICATION
router.get("/vehicles/pending", adminAuth, controller.getPendingVehicles);
router.patch("/vehicles/:id/verify-rc", adminAuth, controller.verifyRC);
router.patch("/vehicles/:id/verify-noc", adminAuth, controller.verifyNOC);
router.patch("/vehicles/:id/verify-vehicle", adminAuth, controller.verifyVehicle);
router.patch("/vehicles/:id/activate", adminAuth, controller.activateVehicle);
router.patch("/vehicles/:id/verify-images", adminAuth, controller.verifyImages);

// document viewing
router.get("/vehicles/:id/rc", adminAuth, controller.viewRC);
router.get("/vehicles/:id/noc", adminAuth, controller.viewNOC);
router.get("/owners/:ownerId/aadhaar", adminAuth, controller.viewAadhaar);
router.get("/vehicles/:id/images", adminAuth, controller.getVehicleImages);

// image verification
module.exports = router;
