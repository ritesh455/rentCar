import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export default function UserLogin() {
  const navigate = useNavigate();
  const { login, role: ctxRole } = useContext(DataContext);

  // 🔹 role selection: user | owner
  const [role, setRole] = useState("user");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Role-based login (API decided in DataContext)
      const result = await login({ role, email, password });

      alert("Login successful");

      // 🔁 Redirect based on authoritative role returned by DataContext.login
      const actualRole = result?.role || ctxRole || role;
      if (actualRole === "owner") {
        navigate("/owner/vehicles");
      } else {
        navigate("/vehicles");
      }

    } catch (error) {
      alert(error?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        {/* 🔹 ROLE TOGGLE */}
        <div className="flex bg-gray-200 rounded-full mb-6">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition
              ${role === "user"
                ? "bg-green-600 text-white"
                : "text-gray-600"
              }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition
              ${role === "owner"
                ? "bg-green-600 text-white"
                : "text-gray-600"
              }`}
          >
            Owner
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          {role === "owner" ? "Owner Login" : "User Login"}
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Please login to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        

        {/* Optional register link only for users */}
        {(
          <p className="text-center text-sm mt-4">
            Don’t  have an account?{" "}
            <span
              className="text-green-600 cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
