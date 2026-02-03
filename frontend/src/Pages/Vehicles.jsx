import { useState } from "react";
import { vehicles } from "../Data/vehicles";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");

  // 🔹 FILTER LOGIC
  const filteredVehicles = vehicles.filter((v) => {
    return (
      v.name.toLowerCase().includes(search.toLowerCase()) &&
      (location ? v.location === location : true) &&
      v.price >= minPrice &&
      v.price <= maxPrice &&
      (brand ? v.brand === brand : true) &&
      (fuel ? v.fuel === fuel : true) &&
      (seats ? v.seats === Number(seats) : true)
    );
  });

  return (
    <div>
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-100 p-6">

        {/* 🔍 Search Bar */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search car or bike"
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option>Ahmedabad</option>
            <option>Mumbai</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* 🧩 Sidebar Filters */}
          <div className="bg-white p-4 rounded shadow h-fit">
            <h3 className="font-semibold mb-4">Filters</h3>

            {/* Price */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Price Range (₹)</p>
              <input
                type="number"
                placeholder="Min Price"
                className="border p-2 rounded w-full mb-2"
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="border p-2 rounded w-full"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            {/* Brand */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Brand</p>
              <select
                className="border p-2 rounded w-full"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option>Hyundai</option>
                <option>Kia</option>
                <option>Honda</option>
              </select>
            </div>

            {/* Fuel */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Fuel Type</p>
              <select
                className="border p-2 rounded w-full"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                <option value="">All</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
              </select>
            </div>

            {/* Seats */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Seating Capacity</p>
              <select
                className="border p-2 rounded w-full"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              >
                <option value="">Any</option>
                <option value="2">2 Seater</option>
                <option value="4">4 Seater</option>
                <option value="5">5 Seater</option>
                <option value="7">7 Seater</option>
              </select>
            </div>

            {/* Clear */}
            <button
              className="text-sm text-blue-600"
              onClick={() => {
                setSearch("");
                setLocation("");
                setMinPrice(0);
                setMaxPrice(10000);
                setBrand("");
                setFuel("");
                setSeats("");
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* 🚗 Vehicle List */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVehicles.length === 0 ? (
              <p className="text-gray-500">No vehicles found</p>
            ) : (
              filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded shadow p-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-40 w-full object-cover rounded"
                  />

                  <h3 className="font-semibold mt-2">{vehicle.name}</h3>

                  <p className="text-sm text-gray-500">
                    {vehicle.brand} • {vehicle.fuel} • {vehicle.seats} Seats
                  </p>

                  <p className="font-semibold mt-2">
                    ₹{vehicle.price} / day
                  </p>

                  <p className="text-xs text-gray-500">
                    Location: {vehicle.location}
                  </p>

                  <Link to={`/vehicle/${vehicle.id}`}>
                    <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      View Details
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
