import { useState, useEffect,useContext } from "react";
import { getPublicVehicles, assetUrl } from "../../api/api";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export default function Vehicles() {

  const navigate = useNavigate();
  // const { isAuthenticated } = useData(); // 
  const { isAuthenticated,role } = useContext(DataContext);

  const handleRentClick = (vehicleId) => {
    if (!isAuthenticated) {
      alert("Please login to rent a vehicle");
      navigate("/login");
      return;
    } 
    if (role === "owner") {
      navigate("/owner/vehicles");
    } else {
      navigate(`/vehicle/${vehicleId}`);
    }

  };

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Restore all filter states
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000); 
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");

  // 🔹 FILTER LOGIC
  const filteredVehicles = (vehicles || []).filter((v) => {
    const name = `${v.brand ?? ""} ${v.model ?? ""}`.trim();
    const price = v.pricePerDay ?? 0;
    const vFuel = v.fuelType ?? "";
    const vSeats = v.seats ?? 0;

    const nameMatch = name.toLowerCase().includes(search.toLowerCase());
    const locationMatch = !location || (v.location === location || v.ownerloc === location);
    const priceMatch = price >= minPrice && price <= maxPrice;
    const brandMatch = !brand || (v.brand || "").toLowerCase().includes(brand.toLowerCase());
    const fuelMatch = !fuel || (vFuel || "").toLowerCase() === fuel.toLowerCase();
    const seatsMatch = !seats || Number(vSeats) === Number(seats);

    return nameMatch && locationMatch && priceMatch && brandMatch && fuelMatch && seatsMatch;
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPublicVehicles()
      .then((res) => {
        if (!mounted) return;
        const list = Array.isArray(res) ? res : res?.vehicles ?? [];
        setVehicles(list);
        const brands = Array.from(new Set(list.map(v => v.brand).filter(Boolean)));
        setBrandList(brands);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load vehicles');
        setLoading(false);
      });
    return () => { mounted = false };
  }, []);

  const renderLayout = (content) => (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <Navbar />
      </div>
      <div className="mx-auto p-6">{content}</div>
    </div>
  );

  if (loading) return renderLayout(<p className="text-center mt-10">Searching for available rides...</p>);
  if (error) return renderLayout(<p className="text-center text-red-500 mt-10">{error}</p>);

  return renderLayout(
    <>
      {/* 🔍 Top Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 border border-gray-200">
        <input
          type="text"
          placeholder="Search by model or brand..."
          className="border p-3 rounded-lg w-full outline-blue-500 bg-gray-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-3 rounded-lg bg-gray-50 outline-blue-500 min-w-[200px]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option>Ahmedabad</option>
          <option>Mumbai</option>
          <option>Pune</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 🧩 SIDEBAR FILTERS (Restored) */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24 self-start border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">Filter Options</h3>

          {/* Price Range */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-3">Price Per Day (₹)</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="border p-2 rounded-lg w-full text-sm bg-gray-50"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max"
                className="border p-2 rounded-lg w-full text-sm bg-gray-50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Brand Select */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Brand</p>
            <select 
              className="border p-2.5 rounded-lg w-full text-sm bg-gray-50" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brandList.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Fuel Type */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Fuel Type</p>
            <select 
              className="border p-2.5 rounded-lg w-full text-sm bg-gray-50" 
              value={fuel} 
              onChange={(e) => setFuel(e.target.value)}
            >
              <option value="">Any Fuel</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          {/* Seats */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Seating Capacity</p>
            <select 
              className="border p-2.5 rounded-lg w-full text-sm bg-gray-50" 
              value={seats} 
              onChange={(e) => setSeats(e.target.value)}
            >
              <option value="">Any Capacity</option>
              <option value="2">2 Seater</option>
              <option value="4">4 Seater</option>
              <option value="5">5 Seater</option>
              <option value="7">7 Seater</option>
            </select>
          </div>

          <button 
            className="w-full py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors" 
            onClick={() => {
              setSearch(""); setLocation(""); setMinPrice(0); setMaxPrice(20000); setBrand(""); setFuel(""); setSeats("");
            }}
          >
            Clear All Filters
          </button>
        </div>

        {/* 🚗 Vehicle List */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">No vehicles match your current filters.</p>
            </div>
          ) : (
            filteredVehicles.map((v) => (
              <div key={v._id || v.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img 
    src={v.images?.[0] ? assetUrl(v.images[0]) : ""} 
    alt={v.model} 
    className="h-44 w-full object-contain bg-gray-50" // Change made here
  />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{v.brand} {v.model}</h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 text-gray-500 rounded">
                      {v.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
                    {v.fuelType} • {v.seats} Seats
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-blue-600">
                      ₹{v.pricePerDay}<span className="text-xs text-gray-400 font-normal"> /day</span>
                    </span>
                   <button 
  onClick={() => handleRentClick(v._id || v.id)}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
>
  Rent Now
</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}