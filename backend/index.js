require("dotenv").config();

const express = require("express");
const { db } = require("./config/firebase");

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await db.collection("test").doc("ping").set({
      status: "connected",
      time: new Date(),
    });
    res.json({ message: "Firebase connected 🚀" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const userRoutes = require("./modules/users/user.routes");
app.use("/users", userRoutes);

const authRoutes = require("./modules/auth/auth.routes.js");
app.use("/auth", authRoutes);

const vehicleRoutes = require("./modules/vehicles/vehicle.routes");
app.use("/vehicles", vehicleRoutes);

const bookingRoutes = require("./modules/bookings/booking.routes");
app.use("/bookings", bookingRoutes);

const uploadRoutes = require("./routes/upload.routes");
app.use("/upload", uploadRoutes);
