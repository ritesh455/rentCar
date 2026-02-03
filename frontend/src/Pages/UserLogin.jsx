import { useEffect } from "react";

export default function UserLogin({ onClose }) {
  useEffect(() => {
    // Freeze background scroll
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed mt-100 inset-0 z-50 flex items-center justify-center">
      
      {/* 🔹 Dull background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-100"
        onClick={onClose}
      ></div>

      {/* 🔹 Login Popup */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="border-2 rounded p-1" />
          <input type="password" placeholder="Password" className="border-2 rounded p-1" />
          <button className="bg-green-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
