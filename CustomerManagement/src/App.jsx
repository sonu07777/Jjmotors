// import { useState } from 'react'

import './App.css'
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
