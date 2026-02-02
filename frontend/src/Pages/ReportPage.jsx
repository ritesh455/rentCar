function ReportPage(){
    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">
          Report a Scam or Complaints
        </h1>

        <form className="space-y-4">
          {/* Listing ID */}
          <div>
            <label className="text-sm block mb-1">Car / Booking ID</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter ID"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm block mb-1">Reason</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Complaints</option>
              <option>Scam</option>
              <option>Overcharging</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm block mb-1">Message</label>
            <textarea
              rows="3"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Describe the issue..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>

    )
}
export default ReportPage