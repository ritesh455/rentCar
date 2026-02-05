import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom'; // Added for better UX

const OwnerRegister = () => {
  // 1. Change 'registerOwner' to 'registerOwnerAccount' to match your Context
  const { registerOwnerAccount, loading, error } = useContext(DataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', dob: '', address: '', image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // For files, we take the first file; for text, we take the value
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. Prepare FormData (Required for images)
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("dob", formData.dob);
    data.append("address", formData.address);
    data.append("image", formData.image);

    try {
      // 3. Call the correct function name
      await registerOwnerAccount(data);
      alert('Owner Registered Successfully! Please check for OTP.');
      // navigate('/verify-otp'); // Redirect to OTP page if needed
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Owner Registration</h2>
        
        <div className="space-y-3">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          
          <div>
            <label className="text-xs text-gray-500 ml-1">Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          </div>

          <textarea name="address" placeholder="Full Address" onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none h-24" required></textarea>
          
          <div className="bg-gray-50 p-3 rounded border border-dashed border-gray-300">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input type="file" name="image" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*" required />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2">
            <p className="text-red-700 text-xs">{error}</p>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-3 rounded text-white font-semibold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
        >
          {loading ? 'Processing...' : 'Register as Owner'}
        </button>
      </form>
    </div>
  );
};

export default OwnerRegister;