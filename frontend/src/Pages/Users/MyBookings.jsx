import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
// Assuming you still use the assetUrl helper for car images
import { assetUrl } from "../../api/api"; 

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookedCars, setBookedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace this with an actual API call like getMyBookings()
  useEffect(() => {
    const fetchBookings = async () => {
      // Simulate API delay
      setTimeout(() => {
        setBookedCars([
          {
            id: "BOK-101",
            brand: "Tesla",
            model: "Model 3",
            price: 80,
            status: "Confirmed",
            image: "uploads/tesla-model-3.png", // Example path
            date: "March 11, 2024",
          },
          {
            id: "BOK-102",
            brand: "BMW",
            model: "M4 Coupe",
            price: 120,
            status: "Completed",
            image: "uploads/bmw-m4.png",
            date: "Feb 20, 2024",
          },
        ]);
        setLoading(false);
      }, 800);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-500">View and manage your recent car rentals.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedCars.map((car) => (
              <div
                key={car.id}
                onClick={() => navigate(`/rental-summary/${car.id}`)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all group"
              >
                {/* Car Image Section */}
                <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={assetUrl(car.image)}
                    alt={car.model}
                    className="h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x150?text=No+Image"; }}
                  />
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{car.brand} {car.model}</h3>
                      <p className="text-xs text-gray-400">ID: {car.id}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                      car.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {car.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">BOOKED ON</p>
                      <p className="text-sm font-semibold">{car.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium">TOTAL</p>
                      <p className="text-lg font-bold text-blue-600">₹{car.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 py-2 text-sm font-bold text-blue-600 border border-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    View Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && bookedCars.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
            <p className="text-gray-400">You haven't booked any cars yet.</p>
            <button 
              onClick={() => navigate("/vehicles")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Browse Cars
            </button>
          </div>
        )}
      </div>
    </div>
  );
}