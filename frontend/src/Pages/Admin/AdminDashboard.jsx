import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getPendingVehicles,
    verifyVehicleApi,
    createAdminAccount,
    assetUrl
} from '../../api/api';
// import Navbar from '../../components/Navbar';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("pending");
    const [vehicles, setVehicles] = useState([]);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Destructure functions from context
    const { logoutAdmin } = useData();

    useEffect(() => {
        if (activeTab === "pending") {
            fetchPending();
        }
    }, [activeTab]);

    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await getPendingVehicles();
            // Normalized fetching: checking for .vehicles property or direct array
            const data = Array.isArray(res) ? res : res?.vehicles ?? [];
            setVehicles(data);
        } catch (err) {
            console.error("Fetch pending error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        if (!window.confirm("Are you sure you want to verify this vehicle?")) return;
        try {
            await verifyVehicleApi(id);
            alert("Vehicle Verified Successfully!");
            fetchPending();
        } catch (err) {
            alert("Verification failed: " + err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <div className="sticky top-0 z-50 w-full bg-white shadow-md">
                <Navbar />
            </div> */}

            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Control Center</h1>
                        <p className="text-gray-500">Manage vehicle verifications and system administrators.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAdminModal(true)}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                        >
                            + Add New Admin
                        </button>
                        <button
                            onClick={logoutAdmin}
                            className="bg-white text-red-600 border border-red-200 px-6 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-all active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Custom Tabs */}
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <button
                        className={`pb-4 text-sm font-bold transition-all ${activeTab === "pending"
                                ? "border-b-4 border-blue-600 text-blue-600"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                        onClick={() => setActiveTab("pending")}
                    >
                        PENDING REQUESTS ({vehicles.length})
                    </button>
                    <button
                        className={`pb-4 text-sm font-bold transition-all ${activeTab === "verified"
                                ? "border-b-4 border-blue-600 text-blue-600"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                        onClick={() => setActiveTab("verified")}
                    >
                        VERIFIED VEHICLES
                    </button>
                </div>

                {/* Main Content Area */}
                {activeTab === "pending" ? (
                    <>
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vehicles.map((v) => (
                                    <div key={v._id || v.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-all">

                                        {/* 🚗 Image Container - Styled like your Vehicles page */}
                                        <div className="h-48 w-full bg-gray-50 relative flex items-center justify-center">
                                            <img
                                                src={v.images?.length > 0 ? assetUrl(v.images[0]) : "https://via.placeholder.com/400x300?text=No+Image"}
                                                alt={v.model}
                                                className="h-full w-full object-contain bg-gray-50"
                                            />
                                            <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                                Pending Review
                                            </div>
                                        </div>

                                        {/* Vehicle Info */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-xl text-gray-800">{v.brand} {v.model}</h3>
                                                <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 text-gray-500 rounded">
                                                    {v.type}
                                                </span>
                                            </div>

                                            <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
                                                {v.fuelType} • {v.seats} Seats • No: {v.vehicleNumber}
                                            </p>

                                            <div className="pt-4 border-t border-gray-50">
                                                <button
                                                    onClick={() => navigate(`/admin/verify-vehicle/${v.id}`)}
                                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-bold"
                                                >
                                                    Review & Verify
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!loading && vehicles.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 text-lg font-medium">No pending vehicles found in the queue.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-5xl mb-4">🏗️</div>
                        <h3 className="text-xl font-bold text-gray-700">Verified Section</h3>
                        <p className="text-gray-400 mt-2">API integration for verified vehicles list is coming soon.</p>
                    </div>
                )}
            </div>

            {/* Admin Modal component remains exactly the same as your provided code */}
            {showAdminModal && (
                <AdminModal onClose={() => setShowAdminModal(false)} />
            )}
        </div>
    );
}

// Sub-component for adding admin remains the same
function AdminModal({ onClose }) {
    const [formData, setFormData] = useState({ email: "", name: "", password: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createAdminAccount(formData);
            alert("New Administrator created successfully!");
            onClose();
        } catch (err) {
            alert(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <form onSubmit={handleCreate} className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Create New Admin</h3>
                <p className="text-gray-500 text-sm mb-6">Grant administrative access to a new user.</p>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" required className="w-full border border-gray-200 p-3 mt-1 rounded-xl outline-blue-500 bg-gray-50"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                        <input type="email" placeholder="admin@example.com" required className="w-full border border-gray-200 p-3 mt-1 rounded-xl outline-blue-500 bg-gray-50"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Secure Password</label>
                        <input type="password" placeholder="••••••••" required className="w-full border border-gray-200 p-3 mt-1 rounded-xl outline-blue-500 bg-gray-50"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button type="button" onClick={onClose} className="flex-1 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300"
                    >
                        {submitting ? "Creating..." : "Create Admin"}
                    </button>
                </div>
            </form>
        </div>
    );
}