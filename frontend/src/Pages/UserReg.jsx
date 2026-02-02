export default function UserReg() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
          />

          <input
            type="email"
            placeholder="Email"
            className="input"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            maxLength={10}
            className="input"
          />

          {/* DOB */}
          <input
            type="date"
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
