import axios from "axios";

// ✅ Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ enables cookies (JWT)
});

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
