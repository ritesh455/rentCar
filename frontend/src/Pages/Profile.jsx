import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Profile = () => {
  const navigate = useNavigate();

  // const navigate = useNavigate();
    // const { isAuthenticated } = useData(); // 
    const { isAuthenticated,role } = useContext(DataContext);
  
    const handleBookClick = () => {
      if (!isAuthenticated) {
        alert("Please login to rent a vehicle");
        navigate("/login");
        return;
      } 
      if (role === "owner") {
        navigate("/owner/vehicles");
      } else {
        navigate(`/my-bookings`);
      }
  
    };
      const getButtonText = () => {
    if (isAuthenticated && role === "owner") {
      return "See Your Vehicles";
    }
    return "My Bookings";
  };

  // Example: getting user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user data
    navigate("/"); // redirect to home
  };

  if (!user) {
    return (
      <div>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>

        <div className="flex justify-end items-center p-4">
          <button 
              onClick={handleBookClick}
              className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all"
            >
               {getButtonText()}
            </button>
            </div>

        <div className="flex justify-center items-center h-60">
        
        <p className="text-red-500 text-lg">
          No user data found. Please login.
        </p>
      </div>
      </div>
    );
  }

  return (
    <div>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>

        <div className="flex justify-end items-center p-4">
          <button 
              onClick={handleBookClick}
              className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all"
            >
               {getButtonText()}
            </button>
            </div>

        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        User Profile
      </h2>

      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
    </div>
  );
};

export default Profile;
