import { useState } from "react";
import { Link } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";

const navItems = ["Home", "About", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 h-14">
        <h1 className="text-xl font-bold">RentCar</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 mr-10 items-center">
          {navItems.map(item => (
            <li
              key={item}
              className="cursor-pointer hover:text-blue-500"
            >
              {item}
            </li>
          ))}

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
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-gray-100 p-4 space-y-3">
          {navItems.map(item => (
            <li
              key={item}
              className="p-2 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}

          <button
            onClick={() => {
              setShowLogin(true);
              setOpen(false);
            }}
            className="bg-green-600 text-white px-5 py-1 rounded w-full"
          >
            Login
          </button>

          <Link to="/register">
            <button className="bg-gray-800 text-white px-5 py-1 rounded w-full">
              Register
            </button>
          </Link>
        </ul>
      )}

      {/* Login Modal */}
      {showLogin && <UserLogin onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;
