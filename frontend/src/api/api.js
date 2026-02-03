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

// 🔹 Login API
export const loginUser = async (data) => {
  try {
    const res = await api.post("/users/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// 🔹 Logout API
export const logoutUser = async () => {
  try {
    const res = await api.post("/users/logout");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};

// 🔹 Check session / current user
export const checkSession = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Session expired";
  }
};

export default api;
