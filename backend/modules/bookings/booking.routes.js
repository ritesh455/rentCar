const express = require("express");
const router = express.Router();
const controller = require("./booking.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, controller.createBooking);
router.get("/my", authMiddleware, controller.getMyBookings);
router.patch("/:id/cancel", authMiddleware, controller.cancelBooking);

module.exports = router;
