import React from "react";
import Loader from "../../components/common/Loader";
import { useSelector } from "react-redux";
import EditProfileImage from "../../components/dashboard/EditProfileImage";
import EditDetails from "../../components/dashboard/EditDetails";
import EditPassword from "../../components/dashboard/EditPassword";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
 

  if (!user) {
    return (
      <div className="flex items-center flex-col min-h-screen justify-center gap-2 md:gap-4 lg:gap-6 ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
        Edit profile
      </h1>
      <EditProfileImage/>
      <EditDetails/>
      <EditPassword/>
    </div>
  );
};

export default Settings;
