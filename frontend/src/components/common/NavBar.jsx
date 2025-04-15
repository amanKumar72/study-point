import React, {  useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaTimes, FaBars } from "react-icons/fa";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" md:px-10 md:py-4 px-4 py-2 border-b-gray-500 bg-gray-800 border-b-1 mx-auto flex items-center justify-between">
      <div className="flex items-center justify-between w-[35%] md:w-[20%]">
        <img src={logo} alt="logo" />
      </div>
      <div
        className={`md:flex md:items-center lg:text-xl bg-gray-800  lg:w-[60%] md:w-[70%] absolute md:static z-10 md:bg-transparent w-full left-0 md:justify-between transition-all duration-300 ease-in ${
          isOpen ? "top-10" : "top-[-280px]"
        } md:top-0`}
      >
        <div className=" gap-1 md:gap-4 flex flex-col md:flex-row ">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  md:p-0 px-4 py-1 hover:bg-gray-700  `;
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  md:p-0 px-4 py-1 hover:bg-gray-700  `;
            }}
          >
            Catalog
          </NavLink>
          <NavLink
            to="/aboutUs"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  md:p-0 px-4 py-1 hover:bg-gray-700  `;
            }}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactUs"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  md:p-0 px-4 py-1 hover:bg-gray-700  `;
            }}
          >
            Contact Us
          </NavLink>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col md:flex-row">
          <NavLink
            to="/login"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              } md:bg-gray-700 md:rounded-lg md:shadow-md md:shadow-gray-500 px-4 py-1 md:py-2  hover:bg-gray-700  `;
            }}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  md:bg-gray-700 md:rounded-lg md:shadow-md md:shadow-gray-500 px-4 py-1 md:py-2 hover:bg-gray-700  `;
            }}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
      <button
        className="text-white text-2xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default NavBar;
