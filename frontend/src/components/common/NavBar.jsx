import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaTimes, FaBars } from "react-icons/fa";
import { GrCart } from "react-icons/gr";

import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector((state) => state.profile.user);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();
  const items = [
    "Python",
    "Web Developement",
    "Android Developement",
    "Blockchain",
    "Artificial Intelligence",
    "Data Science",
    "Cloud Computing",
    "Devops",
    "CyberSecurity",
  ];
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <header className=" md:px-10 md:py-4 px-4 py-2 border-b-gray-500 bg-gray-800 border-b-1 mx-auto flex items-center justify-between">
      <div className="flex items-center justify-between w-[35%] md:w-[18%]">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div
        className={`md:flex md:items-center lg:text-xl bg-gray-800  xl:w-[60%] lg:w-[70%] md:w-[80%] absolute md:static z-10 md:bg-transparent w-full left-0 md:justify-between transition-all duration-300 ease-in ${
          isOpen ? "top-10" : "top-[-280px]"
        } md:top-0`}
      >
        <div className=" gap-1 lg:gap-2 flex flex-col md:flex-row ">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  px-3 py-1 hover:bg-gray-700   rounded-xl`;
            }}
          >
            Home
          </NavLink>
          <div className="px-3 py-1 md:p-0 hover:bg-gray-700 rounded-xl">
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => setIsCatalogOpen(true)}
              onMouseLeave={() => setIsCatalogOpen(false)}
            >
              <button className="text-white font-medium px-4 py-2">
                Catalog <span className="ml-1">▼</span>
              </button>

              {isCatalogOpen && (
                <div className="absolute left-18/12 md:left-1/2 top-5 transform -translate-x-1/2 mt-2 w-64 text-black bg-gray-100 rounded-lg shadow-lg z-50 py-4">
                  {/* Triangle on top */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-gray-100 rotate-45 z-0" />

                  <ul className="relative z-10">
                    {items.map((item, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          navigate(
                            `/catalog/${item
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          )
                        }
                        className="px-6 py-2 hover:bg-gray-300 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <NavLink
            to="/aboutus"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }   px-3 py-1 hover:bg-gray-700 rounded-xl`;
            }}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactUs"
            className={({ isActive }) => {
              return `${
                isActive ? "text-yellow-200 " : ""
              }  px-3 py-1 hover:bg-gray-700 rounded-xl `;
            }}
          >
            Contact Us
          </NavLink>
        </div>
        {user ? (
          <div className="flex flex-col md:flex-row">
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-yellow-200 " : ""
                }  px-3 py-1 hover:bg-gray-700 rounded-xl `;
              }}
            >
              {!isOpen ? <GrCart className="text-white text-2xl" /> : "Cart"}
            </NavLink>
            <button
              className="px-3 py-1 hover:bg-gray-700 text-start rounded-xl"
              to="/dashboard"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}
            >
              {!isOpen ? (
                <img
                  src={user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                "Profile"
              )}
              {showProfileOptions && (
                <div className="absolute top-52 right-8/12 md:top-15 p-2 md:p-4 md:right-10 bg-white text-black rounded-lg shadow-lg z-10">
                  <NavLink
                    to="/dashboard"
                    className=" hover:bg-gray-300 p-1 md:p-2 block mb-2 rounded-md"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      setShowProfileOptions(false);
                      navigate("/logout");
                    }}
                    className=" hover:bg-gray-300 p-1 md:p-2 block mb-2 rounded-md.h"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="flex gap-2 lg:gap-4 flex-col md:flex-row">
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
        )}
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
