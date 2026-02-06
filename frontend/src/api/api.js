import axios from "axios";

// ✅ Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ enables cookies (JWT)
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

export default api;
