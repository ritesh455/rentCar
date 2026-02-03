import axios from "axios";

// Base URL of backend
const BASE_URL = "http://localhost:3000";

// 🔹 Register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
