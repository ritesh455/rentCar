import { createContext, useEffect, useState,useContext } from "react";
import {
  registerUser,
  registerOwner,
  verifyOwnerOtp,
  verifyOtp,
  userLogin,
  ownerLogin,
  logoutUser,
  checkSession,
  addVehicleDetails,
  addVehicleImages,
  getMyVehicles,
} from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // "user" | "owner"
  const [loading, setLoading] = useState(true);
  const [currentVehicleId, setCurrentVehicleId] = useState(null);

  

  // ✅ Check cookie-based session on app load
  useEffect(() => {
    checkSession()
      .then((res) => {
        // backend returns { authenticated: true, user: { ..., role } }
        setIsAuthenticated(true);
        const backendRole = res?.user?.role || res?.role || null;
        if (backendRole) {
          // normalize roles to lowercase 'user'|'owner'
          setRole(String(backendRole).toLowerCase());
        } else {
          setRole(null);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, []);


  // 🔹 Register Owner
  const registerOwnerAccount = async (formData) => {
    return await registerOwner(formData);
  };

  
  // 🔹 Register user
  const register = async (formData) => {
    return await registerUser(formData);
  };

  // 🔹 Verify OTP
const verifyUserOtp = async (data) => {
  // If we know the role, we call the specific API
  if (data.role === "owner") {
    return await verifyOwnerOtp({ email: data.email, otp: data.otp });
  }
  // Otherwise default to normal user
  return await verifyOtp({ email: data.email, otp: data.otp });
};
  

  // 🔹 Role-based Login
  const login = async ({ role, email, password }) => {
    // Call the correct login endpoint (which sets a httpOnly cookie)
    if (role === "owner") {
      await ownerLogin({ email, password });
    } else {
      await userLogin({ email, password });
    }

    // After login the backend sets the token cookie; fetch session to get authoritative role
    const session = await checkSession();
    let finalRole = role === "owner" ? "owner" : "user";

    if (session?.authenticated && session?.user?.role) {
      setIsAuthenticated(true);
      finalRole = String(session.user.role).toLowerCase();
      setRole(finalRole);
    } else {
      // fallback: set based on requested role
      setIsAuthenticated(true);
      setRole(finalRole);
    }

    return { authenticated: true, role: finalRole };
  };

  // 🔹 Logout
  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setRole(null);
  };


  // Register vehicle details (step 1) — expects FormData (with rc & noc files)
  const registerVehicle = async (details) => {
    const res = await addVehicleDetails(details);

    // Backend currently doesn't return the new id. Try to locate the newly created vehicle
    // by fetching owner's vehicles and matching vehicleNumber from the FormData.
    try {
      let vehicleNumber = null;
      if (details instanceof FormData) {
        vehicleNumber = details.get("vehicleNumber");
      } else if (details.vehicleNumber) {
        vehicleNumber = details.vehicleNumber;
      }

      if (vehicleNumber) {
        const my = await getMyVehicles();
        const found = (my?.vehicles || []).find(v => v.vehicleNumber === String(vehicleNumber).trim());
        if (found?.id) {
          setCurrentVehicleId(found.id);
        }
      }
    } catch (err) {
      // ignore lookup errors; registration already succeeded
      // eslint-disable-next-line no-console
      console.warn("Could not resolve new vehicle id:", err);
    }

    return res;
  };

  // Upload images (step 2) — requires currentVehicleId to be set from step 1
  const uploadImages = async (formData) => {
    if (!currentVehicleId) throw "No vehicle ID found";
    const res = await addVehicleImages(currentVehicleId, formData);
    setCurrentVehicleId(null); // Clear ID after successful upload
    return res;
  };

  return (
    <DataContext.Provider
      value={{
        register,
        verifyUserOtp,
        login,
        logout,
        registerOwnerAccount,
        isAuthenticated,
        role,      // ✅ exposed role
        loading,
        registerVehicle,
        uploadImages,
        currentVehicleId
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};