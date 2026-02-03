import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-center mb-2">
            Login
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Welcome back! Please login to continue
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded focus:ring-2 focus:ring-green-400"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded focus:ring-2 focus:ring-green-400"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span
              className="text-green-600 cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
