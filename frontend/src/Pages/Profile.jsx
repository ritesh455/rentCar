import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Profile = () => {
  const navigate = useNavigate();

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
