exports.validateCreateBooking = ({ vehicleId, startDate, endDate }) => {
  if (!vehicleId || !startDate || !endDate) {
    throw { status: 400, message: "vehicleId, startDate and endDate are required" };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    throw { status: 400, message: "Invalid date format (YYYY-MM-DD)" };
  }

  if (end < start) {
    throw { status: 400, message: "endDate cannot be before startDate" };
  }
};
