import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Navbar from "../../components/Navbar";

export default function OwnerVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/owners/vehicles", { withCredentials: true })
      .then((res) => setVehicles(res.data))
      .catch(() => alert("Failed to load vehicles"));
  }, []);

  return (
    <div>
         <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>
    
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search car or bike"
          className="border p-2 rounded w-2/3"
        />

        <button
          onClick={() => navigate("/owner/add-vehicle")}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Vehicle
        </button>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v._id} className="bg-white rounded shadow p-4">
            <img
              src={v.images?.[0]}
              alt={v.name}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{v.name}</h3>
            <p className="text-sm text-gray-600">
              {v.brand} • {v.fuelType}
            </p>

            <p className="font-semibold mt-1">₹{v.pricePerDay} / day</p>
            <p className="text-xs text-gray-500">
              Location: {v.location}
            </p>

            <button
              onClick={() => navigate(`/owner/edit-vehicle/${v._id}`)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
            >
              Update Vehicle
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
