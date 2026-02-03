import { createContext, useEffect, useState } from "react";
import {
  registerUser,
  verifyOtp,
  loginUser,
  logoutUser,
  checkSession,
} from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check cookie-based session on app load
  useEffect(() => {
    checkSession()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Register user
  const register = async (formData) => {
    return await registerUser(formData);
  };

  // 🔹 Verify OTP
  const verifyUserOtp = async (data) => {
    return await verifyOtp(data);
  };

  // 🔹 Login (cookie set by backend)
  const login = async (data) => {
    await loginUser(data);
    setIsAuthenticated(true);
  };

  // 🔹 Logout (cookie cleared by backend)
  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <DataContext.Provider
      value={{
        register,
        verifyUserOtp,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
