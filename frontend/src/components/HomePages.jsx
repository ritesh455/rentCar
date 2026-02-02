function HomePages() {
    return (
        <div>
            {/* Home Page top content background image*/}
            <div className="relative h-[70vh] w-full">
                {/* Background image */}
                <img
                    src="/images/img11.jpg"
                    alt="CarImages"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay (makes image dull) */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-white text-3xl sm:text-5xl font-bold">
                        Explore the Hidden Spots with Rental Cars
                    </h1>

                    <div className="mt-6 flex gap-4">
                        <button className="px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-800 text-white transition">
                            Reserve Your Car
                        </button>

                        <button className="px-6 py-3 rounded-xl border border-white text-white hover:bg-white hover:text-black transition">
                            About Us
                        </button>
                    </div>
                </div>
            </div>
            {/* END HERE Home Page top content background image */}


            {/* Sontaniner Bar that show features of our Page */}
            <div className="bg-yellow-400 p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
                    {/* Item 1 */}
                    <div className="flex flex-col items-start space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-700 rounded-full p-1">
                                {/* Check icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <h3 className="font-bold text-lg">Well maintained vehicles</h3>
                        </div>
                        <p className="text-sm max-w-xs">
                            All our cars are thoroughly inspected and maintained for smooth, reliable driving.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-start space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-700 rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <h3 className="font-bold text-lg">Affordable pricing</h3>
                        </div>
                        <p className="text-sm max-w-xs">
                            Enjoy transparent pricing with no hidden fees. Great cars at great rates — it's that simple.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-start space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-700 rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <h3 className="font-bold text-lg">24/7 support</h3>
                        </div>
                        <p className="text-sm max-w-xs">
                            We're here whenever you need us. Fast help, friendly service, and full peace of mind.
                        </p>
                    </div>
                </div>
            </div>
            {/* END HERE Sontaniner Bar that show features of our Page */}




            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            We are committed to providing fast, reliable, and professional car rental services.
                        </h1>

                        <button className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition">
                            See Our Fleet
                        </button>
                    </div>

                    {/* Right Image Placeholder */}
                    <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-xl">
                        {/* Image goes here */}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Image + Overlay */}
                    <div className="relative w-full h-80 bg-gray-200 rounded-xl overflow-hidden">
                        {/* Image goes here */}

                        {/* Overlay Card */}
                        <div className="absolute bottom-4 left-4 right-4 bg-green-800 text-white p-4 rounded-xl flex items-center justify-between">
                            <p className="text-sm">
                                No matter the situation, RentalCars is Fast, friendly,
                                and always ready to assist.
                            </p>
                            <span className="bg-lime-400 text-green-900 px-4 py-2 rounded-full text-sm font-semibold">
                                +123 456 7890
                            </span>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Your trusted partner in reliable car rental
                        </h2>

                        <p className="text-gray-600">
                            We take pride in our fleet and customer experience. Rent with confidence,
                            knowing we're here to support every step of your trip.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className=" w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center">
                                    ✓
                                </span>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Easy Booking Process
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Optimized booking for a fast and secure experience.
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <span className=" w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center">
                                    ✓
                                </span>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Convenient Pick-Up & Return
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Flexible locations designed for your comfort.
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <button className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition">
                            Book Car Now
                        </button>
                    </div>
                </div>
            </section>



        </div>

    )
}
export default HomePages