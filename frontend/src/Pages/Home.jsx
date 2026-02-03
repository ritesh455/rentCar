import Footer from "../components/footer"
import Navbar from "../components/navbar"
import CarCard from "../components/CarCard"
import HomePages from "../components/HomePages"
import StepToBook from "../components/StepsToBook"
import ReportPage from "./ReportPage"
import VehicleDetails from "./VehicleDetails"
import RentalSummary from "./RentalSummary"
import Vehicles from "./Vehicles"
import '../index.css'

function Home(){
    return(
        <>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>

<div className="pb-10">

      <HomePages/>

     {/* All carCard list */}
    <div className="" >
        <h1 className="text-4xl font-bold text-gray-900 text-center" >Choose the Prefect car for your trip</h1>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      </div>

      <StepToBook/>


      </div>


{/* <VehicleDetails/> */}
{/* <RentalSummary/> */}
{/* <Vehicles/> */}

<div className="bottom-0 left-0 w-full bg-[#101828] shadow z-10">
  <Footer/>
</div>
        
        </>
    )
}
export default Home