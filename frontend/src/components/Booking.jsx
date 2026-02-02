
function Booking() {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Image Section */}
        <div className="h-64 md:h-auto">
          <img
            src="/images/img11.jpg"
            alt="Vehicle"
            className="w-full rounded-xl h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-5">
            Book Your Ride
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input" placeholder="Name" />
            <input className="input" placeholder="Email" />

            <input className="input" placeholder="Phone" />
            <select className="input">
              <option>Select Vehicle</option>
              <option>Car</option>
              <option>Bike</option>
            </select>

            <input type="date" className="input" />
            <input type="date" className="input" />

            <textarea
              className="input sm:col-span-2"
              placeholder="Message"
              rows="3"
            />

            <button className="sm:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking