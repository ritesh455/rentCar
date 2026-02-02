import Footer from "../components/footer"
import Navbar from "../components/navbar"
import CarCard from "../components/CarCard"
import HomePages from "../components/HomePages"
import '../index.css'

function Home(){
    return(
        <>
        <div className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <Navbar/>
        </div>

<div className="pb-24">

      <HomePages/>

     {/* All carCard list */}
     {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
      <CarCard/>
      <CarCard/>
      <CarCard/>
      <CarCard/>
      </div> */}

      </div>

<div className="fixed bottom-0 left-0 w-full bg-[#101828] shadow z-10">
  <Footer/>
</div>
        
        </>
    )
}
export default Home