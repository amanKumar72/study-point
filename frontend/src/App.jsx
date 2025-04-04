import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div
      className="
    flex min-h-screen flex-col bg-[#000814] text-[#fafafa] font-inter"
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
