import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getAdminVehicleById, verifyRcApi, verifyNocApi, 
  verifyImagesApi, activateVehicleApi, assetUrl 
} from '../../api/api';
// import Navbar from '../../components/Navbar';

export default function VehicleVerification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ rc: false, noc: false, images: false });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    getAdminVehicleById(id)
      .then(res => {
        setData(res);
        // Sync initial verification status if backend provides it
        setStatus({
          rc: res.isRcVerified || false,
          noc: res.isNocVerified || false,
          images: res.isImagesVerified || false
        });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVerifyAction = async (type) => {
    try {
      if (type === 'rc') await verifyRcApi(id);
      if (type === 'noc') await verifyNocApi(id);
      if (type === 'images') await verifyImagesApi(id);
      
      setStatus(prev => ({ ...prev, [type]: true }));
      alert(`${type.toUpperCase()} verified!`);
    } catch (err) { alert("Action failed"); }
  };

  const handleFinalPublish = async () => {
    if (!status.rc || !status.noc || !status.images) {
      return alert("Please verify all documents before publishing.");
    }
    try {
      await activateVehicleApi(id);
      alert("Vehicle has been published successfully!");
      navigate('/admin/dashboard');
    } catch (err) { alert("Publishing failed"); }
  };

  if (loading) return <div className="p-20 text-center">Loading Details...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Verify Vehicle: {data?.brand} {data?.model}</h1>

        {/* Owner & Vehicle Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Owner Information</h3>
            <p className="font-bold text-lg">{data?.ownerName || "N/A"}</p>
            <p className="text-gray-600">{data?.address || "No Address Provided"}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Vehicle Identification</h3>
            <p className="font-bold text-lg">{data?.vehicleNumber}</p>
            <p className="text-gray-600">{data?.brand} - {data?.model}</p>
          </div>
        </div>

        {/* Document Section */}
<div className="space-y-6">
  {/* RC Verification */}
  <VerificationRow 
    label="Registration Certificate (RC)" 
    imgSrc={`${assetUrl(`/admin/vehicles/${id}/rc`)}?token=${token}`} 
    isVerified={status.rc} 
    onVerify={() => handleVerifyAction('rc')} 
    token={token} // Pass token to helper if needed
  />

  {/* NOC Verification */}
  <VerificationRow 
    label="No Objection Certificate (NOC)" 
    imgSrc={`${assetUrl(`/admin/vehicles/${id}/noc`)}?token=${token}`} // 🔹 Fixed
    isVerified={status.noc} 
    onVerify={() => handleVerifyAction('noc')} 
    token={token}
  />

  {/* Vehicle Images Verification */}
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-700">Vehicle Exterior/Interior Images</h3>
      <button >{status.images ? "✓ Images Verified" : "Verify Images"}</button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {data?.images?.map((img, index) => {
        const fullImgUrl = `${assetUrl(img)}?token=${token}`; // 🔹 Fixed
        return (
          <img 
            key={index}
            src={fullImgUrl} 
            alt="Vehicle"
            className="h-32 w-full object-cover rounded-lg cursor-pointer border"
            onClick={() => window.open(fullImgUrl, "_blank")} // 🔹 Fixed
          />
        );
      })}
    </div>
  </div>
</div>
        {/* Final Button */}
        <button 
          onClick={handleFinalPublish}
          className="w-full mt-10 bg-green-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-green-700 shadow-lg"
        >
          Verify & Publish Vehicle
        </button>
      </div>
    </div>
  );
}

function VerificationRow({ label, imgSrc, isVerified, onVerify }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="font-bold text-gray-700 mb-2">{label}</h3>
        <img 
          src={imgSrc} 
          alt={label}
          className="h-40 w-64 object-cover rounded-lg cursor-pointer border hover:border-blue-500"
          onClick={() => window.open(imgSrc, "_blank")}
        />
      </div>
      <button 
        onClick={onVerify}
        disabled={isVerified}
        className={`px-8 py-3 rounded-xl font-bold transition-all ${isVerified ? "bg-green-100 text-green-600 cursor-default" : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        {isVerified ? "✓ Is Verified" : "Verify Document"}
      </button>
    </div>
  );
}