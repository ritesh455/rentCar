import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/UserLogin";
import Register from "./Pages/UserReg";
import Vehicles from "./Pages/Vehicles";
import VehicleDetails from "./Pages/VehicleDetails";
import RentalSummary from "./Pages/RentalSummary";
import Profile from "./Pages/Profile";
import Otp from "./Pages/otp";
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
    </Routes>
    </>
  )
}

export default App
