import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { addVehicleImages } from "../../api/api";

export default function VehicleImageUpload() {
  const { uploadImages, currentVehicleId } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);

  // Determine vehicleId: prefer location.state.vehicleId, then context.currentVehicleId
  const vehicleIdFromState = location?.state?.vehicleId;
  const vehicleId = vehicleIdFromState || currentVehicleId;

  // 🛡️ Block access if no vehicle ID exists
  useEffect(() => {
    if (!vehicleId) navigate("/owner/add-vehicle");
  }, [vehicleId, navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    images.forEach(img => data.append("images", img));

    try {
      if (vehicleIdFromState && !currentVehicleId) {
        // Use direct API call when vehicleId was provided via navigation state
        await addVehicleImages(vehicleIdFromState, data);
      } else {
        // Use context helper which relies on currentVehicleId
        await uploadImages(data);
      }

      alert("Vehicle and images uploaded successfully!");
      navigate("/owner/vehicles");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || String(err);
      alert(msg);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-2 text-green-600">Step 2: Upload Images</h2>
  <p className="text-sm text-gray-500 mb-6">Vehicle ID: {vehicleId || "-"}</p>
      
      <form onSubmit={handleUpload} className="flex flex-col gap-6">
        <div className="border-2 border-dashed border-gray-300 p-10 text-center rounded-lg">
          <input 
            type="file" 
            multiple 
            onChange={(e) => setImages(Array.from(e.target.files))} 
            className="mb-4"
            required
          />
          <p className="text-xs text-gray-400">Upload high-quality images for better booking chances.</p>
        </div>
        
        <button className="bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Finish Registration</button>
      </form>
    </div>
  );
}