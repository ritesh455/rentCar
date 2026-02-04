import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function VehicleForm() {
  const navigate = useNavigate();

  const [vehicleType, setVehicleType] = useState("Car");

  const [formData, setFormData] = useState({
    brand: "",
    year: "",
    vehicleNumber: "",
    fuelType: "Petrol",
    seats: "",
    doors: "",
    ac: false,
    bikeType: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/owners/vehicles", formData, {
      withCredentials: true,
    });

    alert("Vehicle added");
    navigate("/owner/vehicles");
  };

  return (
    <div>
     <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">

        {/* Vehicle Type */}
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Car</option>
          <option>Bike</option>
        </select>

        {/* Brand */}
        <input
          name="brand"
          placeholder="Brand / Manufacturer"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        {/* Year */}
        <input
          name="year"
          placeholder="Year of Manufacture"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        {/* Vehicle Number */}
        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        {/* Fuel Type */}
        <select
          name="fuelType"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>

        {/* CAR ONLY */}
        {vehicleType === "Car" && (
          <>
            <input
              name="seats"
              placeholder="Number of Seats"
              className="border p-2 rounded"
              onChange={handleChange}
            />

            <input
              name="doors"
              placeholder="Number of Doors"
              className="border p-2 rounded"
              onChange={handleChange}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="ac"
                onChange={handleChange}
              />
              AC Available
            </label>
          </>
        )}

        {/* BIKE ONLY */}
        {vehicleType === "Bike" && (
          <select
            name="bikeType"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Bike Type</option>
            <option>Scooter</option>
            <option>Sports</option>
            <option>Cruiser</option>
            <option>Electric</option>
          </select>
        )}

        {/* FILE UPLOADS */}
        <input type="file" multiple />
        <input type="file" />
        <input type="file" />

        <button className="bg-blue-600 text-white py-2 rounded">
          Save Vehicle
        </button>
      </form>
    </div>
    </div>
  );
}
