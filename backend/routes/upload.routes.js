const express = require("express");
const multer = require("multer");
const controller = require("../controllers/upload.controller");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

const router = express.Router();

router.post("/owner/aadhaar", upload.single("image"), controller.uploadAadhaar);
router.post("/vehicle/rc", upload.single("image"), controller.uploadRC);
router.post("/vehicle/noc", upload.single("image"), controller.uploadNOC);

module.exports = router;
