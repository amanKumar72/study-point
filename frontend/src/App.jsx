import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OTPVerify from "./pages/OTPVerify";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div
      className="
    flex min-h-screen flex-col bg-[#000814] text-[#fafafa] font-inter"
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/otp" element={<OTPVerify />}></Route>
      </Routes>
    </div>
  );
}

export default App;
