import React from "react";
import Navbar from "../components/navbar";

export default function RentalSummary() {
  return (
    <div>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold">CarRent</h1>
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        </div>

        {/* Breadcrumb */}
        {/* <p className="text-sm text-gray-500 mt-4">
          Home &gt; Cars &gt; Car Details &gt; Payment &gt;{" "}
          <span className="font-medium text-black">Rental Summary</span>
        </p> */}

        {/* Confirmation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
              </span>
              <span className="font-medium">Payment Confirmed</span>
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              Thank you for Choosing <br /> CarRent!
            </h2>

            <p className="text-gray-500 mb-6">
              Here’s your rental summary
            </p>

            {/* Booking Details */}
            <div className="bg-gray-50 p-6 rounded shadow-sm">
              <h3 className="font-semibold mb-4">Booking Details</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reservation Number</span>
                  <span>CH437898033094</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Confirmation Code</span>
                  <span>76849483mount855</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Rental Days</span>
                  <span>3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Pickup / Drop */}
            <div className="border-l-2 border-gray-300 pl-4 space-y-6">
              <div>
                <h4 className="font-semibold">Pick-Up</h4>
                <p className="text-sm text-gray-600">
                  March 11, 2024 • 10:00 AM <br />
                  Istanbul Airport
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Drop-off</h4>
                <p className="text-sm text-gray-600">
                  March 14, 2024 • 10:00 AM <br />
                  Istanbul Airport
                </p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-6 rounded shadow-sm">
              <h3 className="font-semibold mb-4">Payment Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹80.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Rental Price</span>
                  <span>₹80.00</span>
                </div>

                <p className="text-xs text-gray-500">
                  Overall price and includes rental discount
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
