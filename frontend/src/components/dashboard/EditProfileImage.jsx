import React from "react";
import { useForm } from "react-hook-form";
import {
  errormessage,
  loadingmessage,
  updatemessage,
} from "../../services/Toastify";
import { profileApi } from "../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/profileSlice";

const EditProfileImage = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleUpdatePicture = (data) => {
    const file = data.displayPicture?.[0];
    if (!file) {
      errormessage("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("displayPicture", file);

    const toastId = loadingmessage("Updating profile picture...");

    fetch(profileApi.updateDisplayPicture, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success == false) {
          errormessage(toastId, "error", res?.message);
          return;
        }
        updatemessage(toastId, "success", "Upload successful");
        dispatch(setUser(res?.data));
      })
      .catch((err) => {
        errormessage(toastId, "error", "Upload failed. Please try again.");
        console.log(err.message);
      });
  };
  return (
    <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
      <img
        src={user?.image}
        alt="Profile"
        className="rounded-full w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20"
      />

      <div>
        <h1 className="text-md md:text-lg lg:text-xl font-semibold mb-5">
          Update profile picture
        </h1>

        <form
          className="flex gap-4 md:items-center"
          onSubmit={handleSubmit(handleUpdatePicture)}
        >
          <label
            htmlFor="image"
            className="bg-gray-700 font-semibold px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg md:text-lg lg:text-xl cursor-pointer"
          >
            Select
          </label>
          <input
            {...register("displayPicture")}
            type="file"
            name="displayPicture"
            id="image"
            className="hidden"
            accept="image/*"
          />
          <input
            type="submit"
            value="Upload"
            className="bg-yellow-300 cursor-pointer w-full md:w-fit justify-center flex gap-2 items-center text-black px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
          />
        </form>
      </div>
    </section>
  );
};

export default EditProfileImage;
