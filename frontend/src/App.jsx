import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Comman/UserLogin";
import Register from "./Pages/Comman/UserReg";
import Vehicles from "./Pages/Users/Vehicles";
import VehicleDetails from "./Pages/Users/VehicleDetails";
import RentalSummary from "./Pages/RentalSummary";
import Profile from "./Pages/Profile";
import Otp from "./Pages/Comman/otp";
import OwnerVehicles from "./Pages/Owener/OwenerVehicles";
import VehicleDetailsPage from "./Pages/Owener/VehicleDetailsPage";
import VehicleForm from "./Pages/Owener/VehicleForm";
import VehicleImageUpload from "./Pages/Owener/VehicleImageUpload";

// Import your new gatekeeper component
import ProtectedRoute from "./context/ProtectedRoute"; 

function App() {
  return (
    <Routes>
      {/* 🔓 PUBLIC ROUTES (Anyone can access) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicle/:id" element={<VehicleDetails />} />

      {/* 🔐 AUTHENTICATED ROUTES (Any logged-in user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/summary" element={<RentalSummary />} />
      </Route>

      {/* 👑 OWNER ROUTES (Only logged-in Owners) */}
      <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
        <Route path="/owner/vehicles" element={<OwnerVehicles />} />
        <Route path="/owner/add-vehicle" element={<VehicleDetailsPage />} />
        <Route path="/owner/edit-vehicle/:id" element={<VehicleForm />} />
        <Route path="/owner/upload-vehicle-images" element={<VehicleImageUpload />} />
      </Route>

      {/* 404 - Page Not Found (Optional) */}
      <Route path="*" element={<div className="p-20 text-center text-2xl">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;