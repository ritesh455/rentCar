function StepToBook(){
    return(
         <section className="flex flex-col lg:flex-row items-stretch w-full">
      
      {/* Left Text Section */}
      <div className="bg-black text-white p-10 lg:w-1/2 flex flex-col justify-center gap-6">
        <h2 className="text-3xl font-bold">
          Rent your car in 3 easy steps
        </h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-lime-400 text-black font-semibold">
              01
            </span>
            <div>
              <h4 className="font-semibold">Choose Your Car</h4>
              <p className="text-sm text-gray-300">
                Find the perfect car that fits your journey.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-lime-400 text-black font-semibold">
              02
            </span>
            <div>
              <h4 className="font-semibold">Book Online</h4>
              <p className="text-sm text-gray-300">
                Select date and location in seconds.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-lime-400 text-black font-semibold">
              03
            </span>
            <div>
              <h4 className="font-semibold">Pick Up & Drive</h4>
              <p className="text-sm text-gray-300">
                Grab the keys and enjoy your ride.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2">
        <img
          src="/images/img11.jpg"
          alt="Car"
          className="w-full h-full object-cover"
        />
      </div>

    </section>
    )
}
export default StepToBook