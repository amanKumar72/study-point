import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import { MdPersonOutline } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr";
import { IoCart, IoLogOut } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(user);

  return (
    <div>
      <NavBar></NavBar>
      <main className="flex ">
        <aside
          className={`w-fit min-h-screen  border-b-1 border-gray-500 lg:w-[20%] bg-gray-800`}
        >
          <div className="p-2 md:p-4 flex flex-col gap-5">
            <h2 className="text-gray-100 font-semibold px-2 py-1 md:px-4 md:py-2 rounded-lg">
              {isMobile ? (
                <TbGridDots />
              ) : (
                <span className="flex gap-2 items-center">
                  <TbGridDots /> Dashboard
                </span>
              )}
            </h2>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300    px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}
            >
              {isMobile ? (
                <MdPersonOutline />
              ) : (
                <span className="flex gap-2 items-center">
                  <MdPersonOutline /> Profile
                </span>
              )}
            </NavLink>
            <NavLink
              to="/dashboard/enrolled-courses"
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300  px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}
            >
              {isMobile ? (
                <FaGraduationCap />
              ) : (
                <span className="flex gap-2 items-center">
                  <FaGraduationCap /> Enrolled Courses
                </span>
              )}
            </NavLink>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}
            >
              {isMobile ? (
                <IoCart />
              ) : (
                <span className="flex gap-2 items-center">
                  {" "}
                  <IoCart></IoCart> Cart{" "}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-[#3d2a01] text-yellow-400 " : ""
                } text-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-lg  `;
              }}
            >
              {isMobile ? (
                <GrSettingsOption />
              ) : (
                <span className="flex gap-2 items-center">
                  <GrSettingsOption /> Settings
                </span>
              )}
            </NavLink>
            <span className="text-gray-300 flex gap-2 items-center  hover:text-gray-100  px-2 py-1 md:px-4 md:py-2 rounded-lg">
              {isMobile ? (
                <IoLogOut />
              ) : (
                <span className="flex gap-2 items-center">
                  {" "}
                  <IoLogOut></IoLogOut> Logout{" "}
                </span>
              )}
            </span>
          </div>
        </aside>
        <div className="w-full ">
          <Outlet />
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
