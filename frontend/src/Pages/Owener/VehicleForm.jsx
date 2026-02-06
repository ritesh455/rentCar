import { useState, useEffect } from "react";
import api, { addVehicleImages } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function VehicleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [vehicleType, setVehicleType] = useState("Car");

  const [formData, setFormData] = useState({
    brand: "",
    vehicleNumber: "",
    fuelType: "Petrol",
    seats: "",
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

    try {
      if (isEdit) {
        // Only allowed fields for update per backend: brand, model, pricePerDay
        const payload = {
          brand: formData.brand,
          model: formData.model,
          pricePerDay: formData.pricePerDay && Number(formData.pricePerDay),
        };

        await api.put(`/vehicles/${id}`, payload);
        alert("Vehicle updated");
        navigate("/owner/vehicles");
      } else {
        await api.post("/owners/vehicles", formData, {
          withCredentials: true,
        });

        alert("Vehicle added");
        navigate("/owner/vehicles");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Operation failed";
      alert(msg);
    }
  };

  // Load vehicle data when editing
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        // fetch owner's vehicles and find the one with this id
        const res = await api.get("/vehicles/my");
        const list = res.data?.vehicles || [];
        const found = list.find(v => v.id === id || v._id === id);
        if (!found) {
          alert("Vehicle not found");
          navigate('/owner/vehicles');
          return;
        }

        // If images are not uploaded yet, redirect to upload step
        if (!found.isImagesUploaded) {
          // navigate to upload page and pass id in state
          navigate('/owner/upload-vehicle-images', { state: { vehicleId: id } });
          return;
        }

        // populate editable fields
        setVehicleType(found.type === 'car' ? 'Car' : 'Bike');
        setFormData(prev => ({
          ...prev,
          brand: found.brand || "",
          vehicleNumber: found.vehicleNumber || "",
          fuelType: found.fuelType || "Petrol",
          seats: found.seats || "",
        }));
      } catch (err) {
        console.error(err);
        alert("Failed to load vehicle");
        navigate('/owner/vehicles');
      }
    })();
  }, [id, isEdit, navigate]);

  // Helper to upload images directly from this form (optional)
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files?.length ? Array.from(e.target.files) : [];
    if (!files.length) return;
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    try {
      await addVehicleImages(id, fd);
      alert('Images uploaded successfully');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to upload images';
      alert(msg);
    }
  }

  return (
    <div>
     <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>
    <div className="p-6 max-w-3xl mx-auto">

  <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Vehicle" : "Add Vehicle"}</h2>

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
          value={formData.brand}
        />

        {/* Vehicle Number */}
        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          className="border p-2 rounded"
          onChange={handleChange}
          value={formData.vehicleNumber}
          disabled={isEdit} /* vehicleNumber should not be editable */
        />

        {/* Fuel Type */}
        <select
          name="fuelType"
          onChange={handleChange}
          className="border p-2 rounded"
          value={formData.fuelType}
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
              value={formData.seats}
            />
          </>
        )}

        {/* BIKE ONLY */}
        {vehicleType === "Bike" && (
          <select
            name="bikeType"
            onChange={handleChange}
            className="border p-2 rounded"
            value={formData.bikeType}
          >
            <option value="">Bike Type</option>
            <option>Scooter</option>
            <option>Sports</option>
            <option>Cruiser</option>
            <option>Electric</option>
          </select>
        )}

        {/* FILE UPLOADS - RC/NOC are not editable in edit mode */}
        {!isEdit && (
          <>
            <div className="mt-2">Attach RC document (required)</div>
            <input type="file" name="rc" className="" />
            <div className="mt-2">Attach NOC document (required)</div>
            <input type="file" name="noc" className="" />
          </>
        )}

        {isEdit && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Upload / Update Vehicle Images</label>
            <input type="file" multiple onChange={handleImageUpload} />
            <p className="text-xs text-gray-500 mt-1">Use this to upload images (owner cannot change RC/NOC).</p>
          </div>
        )}

        <button className="bg-blue-600 text-white py-2 rounded">
          Save Vehicle
        </button>
      </form>
    </div>
    </div>
  );
}
