import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

const VehicleDetailsPage = () => {
  const navigate = useNavigate();
  const { registerVehicle, loading } = useContext(DataContext);

  const [formData, setFormData] = useState({
    type: '', brand: '', model: '', vehicleNumber: '',
    pricePerDay: '', fuelType: '', seats: ''
  });
  const [nocFile, setNocFile] = useState(null);
  const [rcFile, setRcFile] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation to match backend rules
    if (!rcFile || !nocFile) {
      alert("Both RC and NOC images are required");
      return;
    }

    // Normalize and validate required text fields
    const payload = {
      type: String(formData.type || "").toLowerCase().trim(),
      brand: String(formData.brand || "").trim(),
      model: String(formData.model || "").trim(),
      vehicleNumber: String(formData.vehicleNumber || "").trim(),
      pricePerDay: Number(formData.pricePerDay || 0),
      fuelType: String(formData.fuelType || "").trim(),
      seats: Number(formData.seats || 0)
    };

    if (!payload.type || !payload.brand || !payload.model || !payload.vehicleNumber || !payload.pricePerDay) {
      alert("Please fill all required vehicle fields");
      return;
    }

    // build FormData to match backend expectations
    const data = new FormData();
    data.append("type", payload.type);
    data.append("brand", payload.brand);
    data.append("model", payload.model);
    data.append("vehicleNumber", payload.vehicleNumber);
    data.append("pricePerDay", payload.pricePerDay);
    data.append("fuelType", payload.fuelType);
    data.append("seats", payload.seats);

    // append files under keys expected by multer
    data.append('rc', rcFile);
    data.append('noc', nocFile);

    try {
      await registerVehicle(data);
      navigate('/owner/upload-vehicle-images');
    } catch (err) {
      // surface backend message when available
      const msg = err?.response?.data?.message || err?.message || "Failed to register vehicle";
      console.error("Submission error", err);
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Vehicle Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="type" placeholder="Vehicle Type (e.g. Car)" onChange={handleChange} required className="border p-3 rounded-lg" />
          <input name="brand" placeholder="Brand" onChange={handleChange} required className="border p-3 rounded-lg" />
          <input name="model" placeholder="Model" onChange={handleChange} required className="border p-3 rounded-lg" />
          <input name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} required className="border p-3 rounded-lg" />
          <input name="pricePerDay" type="number" placeholder="Price Per Day (₹)" onChange={handleChange} required className="border p-3 rounded-lg" />
          <select name="fuelType" onChange={handleChange} required className="border p-3 rounded-lg">
            <option value="">Select Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="EV">EV</option>
          </select>
          <input name="seats" type="number" placeholder="Seats" onChange={handleChange} required className="border p-3 rounded-lg" />
          
          <div className="hidden md:block"></div> {/* Spacer */}

          <div className="flex flex-col">
            <label className="text-xs font-bold mb-1">8. NOC Certificate</label>
            <input type="file" onChange={(e) => setNocFile(e.target.files[0])} required className="text-sm border p-2 rounded-lg bg-gray-50" />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold mb-1">9. RC Document</label>
            <input type="file" onChange={(e) => setRcFile(e.target.files[0])} required className="text-sm border p-2 rounded-lg bg-gray-50" />
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-xl text-white font-bold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Registering...' : 'Next: Upload Images'}
        </button>
      </form>
    </div>
  );
};

export default VehicleDetailsPage;