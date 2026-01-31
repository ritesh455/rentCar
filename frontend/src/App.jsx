import { useEffect, useState } from 'react'

function App() {

function callOnce(){
  alert('Hello');
}
useEffect(()=>{
  
callOnce()
},[])

  return (
    <>
   
    </>
  )
}

export default App
