import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/UserLogin";
import Register from "./Pages/UserReg";
import Vehicles from "./Pages/Vehicles";
import VehicleDetails from "./Pages/VehicleDetails";
import RentalSummary from "./Pages/RentalSummary";
import Profile from "./Pages/Profile";
import Otp from "./Pages/otp";
import OwnerVehicles from "./Pages/Owener/OwenerVehicles";
import VehicleForm from "./Pages/Owener/VehicleForm";
import { RequireAuth, RequireRole } from "./components/RoleRoute";
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/vehicles" element={<Vehicles />} />
       <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/summary" element={<RentalSummary />} />
      <Route path="/profile" element={<Profile />} />
       <Route path="/otp" element={<Otp />} />
       
       
      <Route
        path="/owner/vehicles"
        element={
          <RequireAuth>
            <RequireRole allowed={["owner"]}>
              <OwnerVehicles />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/owner/add-vehicle"
        element={
          <RequireAuth>
            <RequireRole allowed={["owner"]}>
              <VehicleForm />
            </RequireRole>
          </RequireAuth>
        }
      />

      <Route
        path="/owner/edit-vehicle/:id"
        element={
          <RequireAuth>
            <RequireRole allowed={["owner"]}>
              <VehicleForm />
            </RequireRole>
          </RequireAuth>
        }
      />

    </Routes>
    </>
  )
}

export default App
