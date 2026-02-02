import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/UserLogin";
import Register from "./Pages/UserReg";
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
