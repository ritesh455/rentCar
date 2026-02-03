import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";

// navItems now accepts contactRef
const navItems = (contactRef) => [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Contact",
    onClick: () =>
      contactRef.current.scrollIntoView({ behavior: "smooth" }),
  },
];

const Navbar = ({ contactRef }) => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Check login status
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const items = navItems(contactRef);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 h-14">
        <h1 className="text-xl font-bold">RentCar</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 mr-10 items-center">
          {items.map((item) => (
            <li key={item.name}>
              {item.path ? (
                <Link
                  to={item.path}
                  className="cursor-pointer hover:text-blue-500"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={item.onClick}
                  className="cursor-pointer hover:text-blue-500"
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}

          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-500 font-medium">
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
              <Link to="/login">
              <button
                className="bg-green-600 text-white px-5 py-1 rounded"
              >
                Login
              </button>
              </Link>

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
          {items.map((item) => (
            <li key={item.name}>
              {item.path ? (
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block p-2 rounded hover:bg-gray-200"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="block w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  {item.name}
                </button>
              )}
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
              <Link to="/login">
              <button
                className="bg-green-600 text-white px-5 py-1 rounded w-full"
              >
                Login
              </button>
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
              >
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
