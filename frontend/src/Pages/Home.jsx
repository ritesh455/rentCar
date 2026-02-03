import Footer from "../components/footer"
import Navbar from "../components/Navbar"
import CarCard from "../components/CarCard"
import HomePages from "../components/HomePages"
import ReportPage from "./ReportPage"
import VehicleDetails from "./VehicleDetails"
import RentalSummary from "./RentalSummary"
import Vehicles from "./Vehicles"
import '../index.css'
import { useRef } from "react";


function Home(){

    const contactRef = useRef(null);

    return(
        <>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar contactRef={contactRef}/>
        </div>

<div className="pb-10">

      <HomePages/>

     {/* All carCard list */}
    {/* <div className="" >
        <h1 className="text-4xl font-bold text-gray-900 text-center" >Choose the Prefect car for your trip</h1>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      </div> */}



      </div>


{/* <VehicleDetails/> */}
{/* <RentalSummary/> */}
{/* <Vehicles/> */}

<div className="bottom-0 pb-6 left-0 w-full bg-[#101828] shadow z-10">
  <Footer contactRef={contactRef}/>
</div>
        
        </>
    )
}
export default Home