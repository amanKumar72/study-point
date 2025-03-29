import {Route,Routes } from "react-router-dom"
import Home from "./pages/Home"

function App() {

  return (
    <div className=" bg-[#fafafa] dark:bg-[#000814] text-[#000814] dark:text-[#fafafa]">
      <Routes>
        <Route path="/" element={<Home />} ></Route>
      </Routes>
    </div>
  )
}

export default App
