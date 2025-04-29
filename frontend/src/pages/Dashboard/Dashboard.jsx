import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import { PiDotsNineLight } from "react-icons/pi";


const Dashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [showSideBar, setShowSideBar] = React.useState(false);
  console.log(showSideBar);
  
  console.log(user);

  return (
    <div>
      <NavBar></NavBar>
      <main className="flex ">
        <button onClick={()=>setShowSideBar(!showSideBar)} className="visible md:hidden absolute top-[30vh]   " title="sidebar">
          <PiDotsNineLight className="text-2xl"></PiDotsNineLight>
        </button>
        <aside className={`w-[40%] md:w-[30%] lg:w-[20%] h-full bg-gray-800 transition duration-100 ease-in  md:visible  `}>
          <div className="p-4 flex flex-col gap-5">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
              Dashboard
            </h2>
            <NavLink
              to="/dashboard/profile"
              
              className={({isActive})=>{
                return `${
                  isActive? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300   px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/enrolled-courses"
              className={({isActive})=>{
                return `${
                  isActive? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300   px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}            >
              Enrolled Courses
            </NavLink>
            <NavLink
              to="/dashboard/cart"
              className={({isActive})=>{
                return `${
                  isActive? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300   px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}            >
              Cart
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({isActive})=>{
                return `${
                  isActive? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300   px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}            >
              Settings
            </NavLink>
            <span
              className="text-gray-300 hover:text-gray-100  px-2 py-1 md:px-4 md:py-2 rounded-lg"
            >
              logout
            </span>
          </div>
        </aside>
        <div className="w-[80%]">
          <Outlet />
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
