import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export default function UserReg() {
  const navigate = useNavigate();
  const { register } = useContext(DataContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // 🔹 Create payload exactly as backend expects
  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.mobile,   // mapping mobile → phone
    dob: formData.dob,
    password: formData.password,
  };
  // console.log("📤 Frontend sending data:", formData);

  try {
    await register(payload);
    // console.log("📤 Frontend sending data:", payload);
    alert("Registration successful");
    navigate("/otp",{
      state: {
    email: payload.email,   // 👈 send email
  },
    });
  } catch (error) {
    alert(error.response.data.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Register to rent cars & bikes easily
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            maxLength={10}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <label>Select Date of Birth :-</label>
          <input
            type="date"
            name="dob"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
