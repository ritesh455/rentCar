const bookingService = require("./booking.service");

exports.createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBooking(req.body, req.user);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const result = await bookingService.getMyBookings(req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const result = await bookingService.cancelBooking(
      req.params.id,
      req.user
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
