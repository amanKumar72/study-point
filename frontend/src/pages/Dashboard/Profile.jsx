import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);

  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">My Profile</h1>
      <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <img
          src={user?.image}
          alt=""
          className="rounded-full w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20 "
        />
        <div className="flex flex-col md:flex-row w-full md:justify-between gap-4 md:items-center ">
          <hgroup className="w-full">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-wrap ">
              {user?.firstName + user?.lastName}
            </h2>
            <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
              {user?.email}
            </h2>
          </hgroup>
          <Link
            to="/dashboard/settings"
            className="bg-yellow-300 w-full justify-center  flex gap-2 items-center md:w-fit   text-black  px-4 py-2  md:px-6 md:py-3  lg:px-8  md:text-lg lg:text-xl rounded-lg"
          >
            Edit <FaRegEdit />
          </Link>
        </div>
      </section>
      <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <div className="flex flex-col md:flex-row w-full md:justify-between gap-4 md:items-center ">
          <hgroup className="w-full">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-wrap ">
              About
            </h2>
            <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
              {user?.additionalDetails?.about || "write Something about you"}
            </h2>
          </hgroup>
          <Link
            to="/dashboard/settings"
            className="bg-yellow-300 flex gap-2 items-center w-full justify-center md:w-fit text-black  px-4 py-2  md:px-6 md:py-3  lg:px-8  md:text-lg lg:text-xl rounded-lg"
          >
            Edit
            <FaRegEdit />
          </Link>
        </div>
      </section>
      <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <div className="flex flex-col  w-full  gap-4  ">
          <div className="w-full flex flex-col gap-2 md:gap-4">
            <h2 className="text-xl  mb-4 md:mb-8 lg:mb-10 md:text-2xl lg:text-4xl font-semibold text-wrap ">
              Personal Details
            </h2>
            <div className="flex">
              <hgroup className="w-full">
                <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                  First Name
                </h2>
                <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                  {user?.firstName || "write Something about you"}
                </h2>
              </hgroup>
              <hgroup className="w-full">
                <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                  Last Name
                </h2>
                <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                  {user?.lastName || "Add your last name"}
                </h2>
              </hgroup>
            </div>
            <div className="flex">
              <hgroup className="w-full">
                <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                  Gender Name
                </h2>
                <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                  {user?.additionalDetails?.gender || "Add your gender"}
                </h2>
              </hgroup>
              <hgroup className="w-full">
                <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                  Date of Birth
                </h2>
                <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                  {user?.additionalDetails?.dateOfBirth || "DD/MM//YYYY"}
                </h2>
              </hgroup>
            </div>
            <div>
              <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                Address Name
              </h2>
              <address className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                {user?.additionalDetails?.address || "write your address "}
              </address>
            </div>
            <hgroup className="w-full">
              <h2 className="text-md md:text-lg lg:text-xl font-semibold text-wrap ">
                About
              </h2>
              <h2 className="text-md md:text-lg break-all lg:text-xl   italic text-gray-300 ">
                {user?.additionalDetails?.about || "write Something about you"}
              </h2>
            </hgroup>
          </div>
          <Link
            to="/dashboard/settings"
            className="bg-yellow-300 flex gap-2 items-center w-full justify-center md:w-fit text-black  px-4 py-2  md:px-6 md:py-3  lg:px-8  md:text-lg lg:text-xl rounded-lg"
          >
            Edit
            <FaRegEdit />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Profile;
