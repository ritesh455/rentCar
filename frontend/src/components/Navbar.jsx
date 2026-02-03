import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Check login status
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 h-14">
        <h1 className="text-xl font-bold">RentCar</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 mr-10 items-center">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="cursor-pointer hover:text-blue-500"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-500 font-medium"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-green-600 text-white px-5 py-1 rounded"
              >
                Login
              </button>

              <Link to="/register">
                <button className="bg-gray-800 text-white px-5 py-1 rounded">
                  Register
                </button>
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-gray-100 p-4 space-y-3">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="block p-2 rounded hover:bg-gray-200"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block p-2 rounded hover:bg-gray-200"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-600 text-white px-5 py-1 rounded w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowLogin(true);
                  setOpen(false);
                }}
                className="bg-green-600 text-white px-5 py-1 rounded w-full"
              >
                Login
              </button>

              <Link to="/register" onClick={() => setOpen(false)}>
                <button className="bg-gray-800 text-white px-5 py-1 rounded w-full">
                  Register
                </button>
              </Link>
            </>
          )}
        </ul>
      )}

      {/* Login Modal */}
      {showLogin && <UserLogin onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;
