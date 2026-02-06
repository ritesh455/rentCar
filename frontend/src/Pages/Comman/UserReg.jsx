import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export default function UnifiedRegister() {
  const navigate = useNavigate();
  const { register, registerOwnerAccount } = useContext(DataContext);

  // 🔹 role selection: user | owner
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "", // mapping to phone in payload
    dob: "",
    password: "",
    confirmPassword: "",
    address: "", // Only for Owner
    image: null, // Only for Owner
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Client-side validation to match backend expectations for owner
    if (role === "owner") {
      const { name, email, password, mobile } = formData;
      if (!name || !email || !password || !mobile) {
        alert("Name, email, password and phone are required for owner registration");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(String(mobile).trim())) {
        alert("Phone number must be exactly 10 digits (numbers only)");
        return;
      }
    }

    setLoading(true);

    try {
      if (role === "owner") {
        // Build multipart/form-data payload (backend expects file in 'image')
        if (!formData.image) {
          throw new Error("Aadhaar image is required for owner registration");
        }

        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("phone", formData.mobile);
        fd.append("dob", formData.dob);
        fd.append("password", formData.password);
        fd.append("address", formData.address);
        fd.append("image", formData.image);

        // DEBUG: log FormData entries (useful when debugging 400 responses)
        for (const pair of fd.entries()) {
          // pair is [key, value] - if value is a File it will log File object
          // eslint-disable-next-line no-console
          console.log("formdata:", pair[0], pair[1]);
        }

        await registerOwnerAccount(fd);
      } else {
        // 👤 USER REGISTRATION (JSON payload)
        const userPayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          dob: formData.dob,
          password: formData.password,
        };
        await register(userPayload);
      }

      alert("Registration successful! Please verify OTP.");
      navigate("/otp", { state: { email: formData.email,
        role: role // "user" or "owner"
       } });
    } catch (error) {
      // show backend message when available
      const msg =
        error?.response?.data?.message ||
        (typeof error === "string" ? error : null) ||
        error?.message ||
        "Registration failed";

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        
        {/* 🔹 ROLE TOGGLE (Just like your Login Page) */}
        <div className="flex bg-gray-200 rounded-full mb-6">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "user" ? "bg-green-600 text-white" : "text-gray-600"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "owner" ? "bg-green-600 text-white" : "text-gray-600"
            }`}
          >
            Owner
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          {role === "owner" ? "Owner Registration" : "Create Account"}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          {role === "owner" ? "List your cars and earn" : "Register to rent cars easily"}
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

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 ml-1 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              onChange={handleChange}
            />
          </div>

          {/* 🔹 OWNER SPECIFIC FIELDS */}
          {role === "owner" && (
            <>
              <textarea
                name="address"
                placeholder="Full Address"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 h-20"
                required
                onChange={handleChange}
              ></textarea>

              <div className="bg-gray-50 p-2 rounded border border-dashed border-gray-300">
                <label className="block text-xs font-medium text-gray-600 mb-1">Aadhaar image (required)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleChange}
                  className="text-xs w-full"
                />
              </div>
            </>
          )}

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
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}