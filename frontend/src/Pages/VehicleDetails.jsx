import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { vehicles } from "../Data/vehicles";

export default function VehicleDetails() {
  const { id } = useParams();

  // 🔍 Find selected vehicle
  const vehicle = vehicles.find((v) => v.id === Number(id));

  // ❌ If vehicle not found
  if (!vehicle) {
    return <p className="text-center mt-10">Vehicle not found</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-xl font-semibold mb-6">Vehicle Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Vehicle Info */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full md:w-60 rounded"
                />

                <div>
                  <h2 className="text-2xl font-semibold">
                    {vehicle.name}
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded ml-2">
                      {vehicle.type}
                    </span>
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {vehicle.seats} Seats • {vehicle.fuel}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <p>✔ Free Cancellation</p>
                    <p>✔ Price Guarantee</p>
                    <p>✔ Theft Protection</p>
                    <p>✔ Damage Waiver</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Details */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Driver Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border p-2 rounded" placeholder="First Name" />
                <input className="border p-2 rounded" placeholder="Last Name" />
                <select className="border p-2 rounded">
                  <option>Driver Age</option>
                  <option>21 - 30</option>
                  <option>31 - 50</option>
                  <option>50+</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <label className="text-center text-sm">Upload Aadhaar</label>
                <input type="file" className="border p-2 rounded" />
                <label className="text-center text-sm">Upload Licence</label>
                <input type="file" className="border p-2 rounded" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input className="border p-2 rounded" placeholder="Mobile Number" />
                <input
                  className="border p-2 rounded"
                  placeholder="Trip Destination (Optional)"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white p-6 rounded shadow h-fit">

            {/* Pickup */}
            <div className="mb-4">
              <h3 className="font-semibold">Pick-up</h3>
              <input type="date" className="border p-2 rounded w-full mt-2" />
              <p className="text-sm text-gray-600">
                Location: {vehicle.location}
              </p>
            </div>

            {/* Drop */}
            <div className="mb-4">
              <h3 className="font-semibold">Drop-off</h3>
              <input type="date" className="border p-2 rounded w-full mt-2" />
              <p className="text-sm text-gray-600">
                Location: {vehicle.location}
              </p>
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Price Summary</h3>

              <div className="flex justify-between text-sm">
                <span>Rental Price</span>
                <span>₹{vehicle.price}</span>
              </div>

              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹40</span>
              </div>

              <div className="flex justify-between font-semibold mt-2">
                <span>Total Amount</span>
                <span>₹{vehicle.price - 40}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
