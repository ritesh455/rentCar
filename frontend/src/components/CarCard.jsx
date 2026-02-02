function CarCard() {

    return (
        <div className="w-full max-w-sm p-2 m-auto mt-3
            rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition ">
            <img
                src="/images/img11.jpg"
                alt="CarImage"
                className="w-full h-48 sm:h-56 rounded-2xl object-cover"
            />

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">Car</h3>
                <p className="text-zinc-600">₹1000 / day</p>

                <button className="mt-3 w-full p-3 rounded-xl bg-zinc-700 hover:bg-zinc-800 text-white transition">
                    Book
                </button>
            </div>
        </div>


    )
}
export default CarCard