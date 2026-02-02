import { useEffect } from "react";

export default function UserLogin({ onClose }) {
  useEffect(() => {
    // Freeze background
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="mt-100 fixed inset-0 z-50 flex items-center justify-center" >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
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
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="bg-green-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
