import Footer from "../components/footer"
import Navbar from "../components/navbar"
import '../index.css'

function Home(){
    return(
        <>
        <Navbar/>
<div className="fixed bottom-0 left-0 w-full bg-[#101828] shadow">
  <Footer/>
</div>
        
        </>
    )
}
export default Home