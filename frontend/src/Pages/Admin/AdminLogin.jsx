import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 🚩 Change 'login' to 'loginAdmin'
    await loginAdmin({ role: "admin", email, password });
    navigate("/admin/dashboard");
  } catch (err) {
    alert("Admin Login failed: " + err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Portal</h2>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Admin Email" required 
            className="w-full p-3 border rounded-lg outline-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required 
            className="w-full p-3 border rounded-lg outline-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
            Login as Administrator
          </button>
        </div>
      </form>
    </div>
  );
}