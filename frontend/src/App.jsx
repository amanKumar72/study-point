import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OTPVerify from "./pages/OTPVerify";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Thankingyou from "./pages/Thankingyou";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <div
      className="
    flex min-h-screen flex-col bg-[#000814] text-[#fafafa] font-inter"
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/thank-you" element={<Thankingyou />}></Route>
        <Route path="/otp" element={<OTPVerify />}></Route>
      </Routes>
    </div>
  );
}

export default App;
