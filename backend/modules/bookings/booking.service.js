const db = require("../../config/firebase");
const validator = require("./booking.validation");

function calculateTotalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1; // inclusive
}

exports.createBooking = async (data, user) => {
  validator.validateCreateBooking(data);

  const { vehicleId, startDate, endDate } = data;

  // 1️⃣ Fetch vehicle
  const vehicleRef = db.collection("vehicles").doc(vehicleId);
  const vehicleSnap = await vehicleRef.get();

  if (!vehicleSnap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const vehicle = vehicleSnap.data();

  // 2️⃣ Check availability conditions
  if (!vehicle.isActive || !vehicle.isVerifiedByAdmin) {
    throw { status: 400, message: "Vehicle not available for booking" };
  }

  // 3️⃣ Calculate days
  const totalDays = calculateTotalDays(startDate, endDate);

  if (totalDays < 1) {
    throw { status: 400, message: "Minimum booking is 1 day" };
  }

  // 4️⃣ Check overlapping bookings (CRITICAL)
  const existingBookings = await db
    .collection("bookings")
    .where("vehicleId", "==", vehicleId)
    .where("status", "==", "CONFIRMED")
    .get();

  for (const doc of existingBookings.docs) {
    const b = doc.data();

    const existingStart = new Date(b.startDate);
    const existingEnd = new Date(b.endDate);

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    const overlap =
      requestedStart <= existingEnd && requestedEnd >= existingStart;

    if (overlap) {
      throw {
        status: 409,
        message: "Vehicle already booked for selected dates"
      };
    }
  }

  // 5️⃣ Price calculation
  const totalAmount = totalDays * vehicle.pricePerDay;

  // 6️⃣ Create booking
  await db.collection("bookings").add({
    userId: user.userId,
    vehicleId,

    startDate,
    endDate,
    totalDays,

    pricePerDay: vehicle.pricePerDay,
    totalAmount,

    status: "CONFIRMED",
    createdAt: new Date()
  });

  return {
    message: "Booking confirmed",
    totalDays,
    totalAmount
  };
};

exports.getMyBookings = async (user) => {
  const snap = await db
    .collection("bookings")
    .where("userId", "==", user.userId)
    .get();

  const bookings = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return { bookings };
};


exports.cancelBooking = async (bookingId, user) => {
  const ref = db.collection("bookings").doc(bookingId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Booking not found" };
  }

  const booking = snap.data();

  // ownership check
  if (booking.userId !== user.userId) {
    throw { status: 403, message: "Not allowed to cancel this booking" };
  }

  // status check
  if (booking.status !== "CONFIRMED") {
    throw { status: 400, message: "Booking cannot be cancelled" };
  }

  // date check
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(booking.startDate);

  if (today >= startDate) {
    throw {
      status: 400,
      message: "Booking cannot be cancelled on or after start date"
    };
  }

  await ref.update({
    status: "CANCELLED",
    cancelledAt: new Date()
  });

  return { message: "Booking cancelled successfully" };
};
