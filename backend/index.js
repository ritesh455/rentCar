require("dotenv").config();
const bootstrapAdmin = require("./utils/admin.bootstrap");
const express = require("express");
const { db } = require("./config/firebase");
const cors=require("cors");
const multerErrorHandler = require("./middleware/multerError.middleware");

const app = express();
app.use(express.json());
app.use(cors(({
  origin: "http://localhost:5173",
  credentials: true
})));
app.use(express.urlencoded({ extended: true }));
//for the automatically make an root admin
(async () => {
  await bootstrapAdmin();
})();

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

const ownerRoute = require("./modules/owners/owner.routes");
app.use("/owners", ownerRoute);

const vehicleRoutes = require("./modules/vehicles/vehicle.routes");
app.use("/vehicles", vehicleRoutes);

const adminRoutes = require("./modules/admin/admin.routes");
app.use("/admin", adminRoutes);

const bookingRoutes = require("./modules/bookings/booking.routes");
app.use("/bookings", bookingRoutes);

const commonRoute = require("./modules/common/common.routes");
app.use("/common", commonRoute);

const uploadRoutes = require("./routes/upload.routes");
app.use("/upload", uploadRoutes);
app.use(multerErrorHandler);
