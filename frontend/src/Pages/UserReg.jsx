import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserReg() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 🔹 Store user in localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // 🔹 Redirect to Home page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Register to rent cars & bikes easily
        </p>

        {/* Form */}
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

          {/* DOB */}
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

        {/* Footer */}
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
