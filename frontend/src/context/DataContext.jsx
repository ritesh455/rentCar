import { createContext } from "react";
import { registerUser } from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  // 🔹 Register user function
  const register = async (formData) => {
    try {
      const result = await registerUser(formData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ register }}>
      {children}
    </DataContext.Provider>
  );
};
