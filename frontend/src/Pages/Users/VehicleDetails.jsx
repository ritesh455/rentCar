import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getPublicVehicle, assetUrl } from "../../api/api";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // New State for handling multiple images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Booking States
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [driverDetails, setDriverDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    mobile: "",
    destination: ""
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPublicVehicle(id)
      .then((res) => {
        const v = res?.vehicle ?? res;
        if (mounted) setVehicle(v);
      })
      .catch((err) => {
        console.error('Failed to load vehicle', err);
        if (mounted) setVehicle(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false };
  }, [id]);

  // Image Navigation Logic
  const allImages = vehicle?.images?.length > 0 ? vehicle.images : [vehicle?.image].filter(Boolean);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const calculateTotal = () => {
    if (!pickupDate || !dropOffDate) return vehicle?.pricePerDay ?? 0;
    const start = new Date(pickupDate);
    const end = new Date(dropOffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return (diffDays * (vehicle?.pricePerDay ?? 0)) - 0;
  };

  const handleBooking = () => {
    if (!pickupDate || !dropOffDate || !driverDetails.firstName) {
      alert("Please fill in dates and driver details");
      return;
    }
    const bookingData = {
      vehicleId: id,
      ...driverDetails,
      pickupDate,
      dropOffDate,
      totalAmount: calculateTotal()
    };
    console.log("Booking Confirmed:", bookingData);
    alert("Booking functionality triggered! Check console.");
  };

  if (loading) return <p className="text-center mt-10 font-bold">Loading Vehicle Data...</p>;
  if (!vehicle) return <p className="text-center mt-10">Vehicle not found</p>;

  const title = `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.trim();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Review & Book Your Ride</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Vehicle Card with Image Slider */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Updated Image Section */}
                <div className="relative w-full md:w-72 h-48 group">
                  <img 
                    src={assetUrl(allImages[currentImageIndex])} 
                    alt={title} 
                    className="w-full h-full object-contain bg-gray-50 rounded-lg shadow-inner" 
                  />
                  
                  {allImages.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ❮
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ❯
                      </button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                        {currentImageIndex + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {vehicle.type}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1 font-medium">{vehicle.seats} Seats • {vehicle.fuelType}  •  Vehicle Reg.No- {vehicle.vehicleNumber} </p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-y-2 text-sm text-green-600 font-semibold">
                    <span>✔ RC Proof</span>
                    <span>✔ Price Guarantee</span>
                    <span>✔ NOC Proof</span>
                    <span>✔ Book now</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail strip (Optional, adds to UI) */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={assetUrl(img)}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${currentImageIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 2. Driver Details Form - No Changes */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Driver Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="First Name" 
                  onChange={(e) => setDriverDetails({...driverDetails, firstName: e.target.value})}
                />
                <input 
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Last Name" 
                />
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Age Range</option>
                  <option>18-25</option>
                  <option>26-50</option>
                  <option>50+</option>
                </select>
                <input 
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Mobile Number" 
                />
              </div>

              <div className="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-2 uppercase">Aadhaar Card (Front)</label>
                  <input type="file" className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-2 uppercase">Driving Licence</label>
                  <input type="file" className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Summary - No Changes */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Booking Summary</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Pickup Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-200 p-2 rounded-md mt-1" 
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Drop-off Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-200 p-2 rounded-md mt-1" 
                    onChange={(e) => setDropOffDate(e.target.value)}
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Pick-up Location</p>
                 <p className="text-sm font-semibold">
  {vehicle.ownerloc 
    ? `${vehicle.ownerloc.line1}, ${vehicle.ownerloc.city}, ${vehicle.ownerloc.state}` 
    : vehicle.location ?? "Address not available"}
</p>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Price</span>
                    <span>₹{vehicle.pricePerDay} / day</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount applied</span>
                    <span>- ₹0</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-blue-200 shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
                >
                  Confirm Booking
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-2 italic">By clicking confirm, you agree to the rental terms & conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}