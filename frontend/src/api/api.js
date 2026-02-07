import axios from "axios";

// ✅ Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ enables cookies (JWT) for authenticated endpoints
});

// Public API instance (no cookies) — use this for public endpoints to avoid CORS credential issues
export const publicApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
});


// 👑 Owner Register API
export const registerOwner = async (ownerData) => {
  try {
    // We don't manually set headers here; Axios handles FormData automatically
    const res = await api.post("/owners/register", ownerData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Owner registration failed";
  }
};


// 🔹 Register API
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/users/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// 🔹 Verify OTP API
export const verifyOtp = async (otpData) => {
  try {
    const res = await api.post("/users/verify-otp", otpData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "OTP verification failed";
  }
};

// 👤 Normal User Login
export const userLogin = async (data) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

// 👑 Owner Login
export const ownerLogin = async (data) => {
  const res = await api.post("/owners/login", data);
  return res.data;
};

// 🔹 Owner OTP Verification API
export const verifyOwnerOtp = async (otpData) => {
  try {
    const res = await api.post("/owners/verify-otp", otpData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Owner OTP verification failed";
  }
};


// 🔹 Logout API
export const logoutUser = async () => {
  try {
    const res = await api.post("/common/logout");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};

// 🔹 Check session / current user
export const checkSession = async () => {
  try {
    const res = await api.get("/common/me");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Session expired";
  }
};


export const addVehicleDetails = async (details) => {
  try {
    const res = await api.post("/vehicles", details);
    return res.data; // Should return { id: "vehicle_id_here" }
  } catch (error) {
    throw error.response?.data?.message || "Failed to save details";
  }
};

// 🔹 Get vehicles for the current owner
export const getMyVehicles = async () => {
  try {
    const res = await api.get("/vehicles/my");
    return res.data; // { vehicles: [...] }
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch vehicles";
  }
};

// 🔹 Add Vehicle Images (Step 2)
export const addVehicleImages = async (vehicleId, imageData) => {
  try {
    const res = await api.post(`/vehicles/${vehicleId}/images`, imageData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to upload images";
  }
};

// 🔹 Public vehicles (for normal users)
export const getPublicVehicles = async () => {
  try {
    const res = await publicApi.get('/vehicles/public');
    return res.data; // expect { vehicles: [...] } or array
  } catch (error) {
    // Provide full error in message for debugging
    const msg = error?.response?.data || error?.message || 'Failed to fetch public vehicles';
    throw msg;
  }
};

export const getPublicVehicle = async (vehicleId) => {
  try {
    const res = await publicApi.get(`/vehicles/public/${vehicleId}`);
    return res.data; // expect vehicle object
  } catch (error) {
    const msg = error?.response?.data || error?.message || 'Failed to fetch vehicle';
    throw msg;
  }
};

export default api;

// Helper to build absolute URL for asset paths returned by backend
export const assetUrl = (path) => {
  if (!path) return "";
  // If path already appears absolute, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Ensure baseURL has no trailing slash
  const base = api.defaults.baseURL.replace(/\/$/, "");
  // Ensure path starts with '/'
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};



// Inside api.js
export const adminLogin = async (data) => {
  const res = await api.post("/admin/login", data);
  return res.data;
};

// 👑 Fetch Pending Vehicles
export const getPendingVehicles = async () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("adminToken"); 
  
  // Make sure you are NOT passing 'adminData' here
  const res = await api.get("/admin/vehicles/pending", {
    headers: {
      Authorization: `Bearer ${token}` // ✅ Use the token, not adminData
    }
  });
  return res.data; 
};


// 👑 Create New Admin
export const createAdminAccount = async (adminData) => {
  // Retrieve the token stored during loginAdmin
  const token = localStorage.getItem("adminToken"); 
  
  const res = await api.post("/admin/create", adminData, {
    headers: {
      Authorization: `Bearer ${token}` // ✅ Attach the token here
    }
  });
  return res.data;
};

// 👑 Verify a Vehicle
export const verifyVehicleApi = async (vehicleId) => {
  const res = await api.patch(`/admin/vehicles/${vehicleId}/verify`);
  return res.data;
};



// api.js

// 🔹 Get specific vehicle details for admin review
export const getAdminVehicleById = async (id) => {
  const token = localStorage.getItem("adminToken");
  const res = await api.get(`/admin/vehicles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // Expecting owner and vehicle details
};

// 🔹 Verification APIs
export const verifyRcApi = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await api.patch(`/admin/vehicles/${id}/verify-rc`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const verifyNocApi = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await api.patch(`/admin/vehicles/${id}/verify-noc`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const verifyImagesApi = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await api.patch(`/admin/vehicles/${id}/verify-images`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// 🔹 Final Activation
export const activateVehicleApi = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await api.patch(`/admin/vehicles/${id}/activate`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};