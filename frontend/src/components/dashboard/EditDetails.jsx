import { useForm } from "react-hook-form";
import {
  errormessage,
  loadingmessage,
  updatemessage,
} from "../../services/Toastify";
import { profileApi } from "../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/profileSlice";
import countryCodes from "../../data/countrycode.json";


const EditDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateDetails = (formData) => {
    const toastId = loadingmessage("Updating profile picture...");

    fetch(profileApi.updateProfile, {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
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
        updatemessage(toastId, "error", "Upload failed. Please try again.");
        console.log(err.message);
      });
  };
  
  return (
    <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <h2 className="text-xl  mb-4 md:mb-8 lg:mb-10 md:text-2xl lg:text-4xl font-semibold text-wrap ">
            Edit Personal Details
          </h2>
          <form
            onSubmit={handleSubmit(handleUpdateDetails)}
            className="flex flex-col gap-2 md:gap-4"
          >
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  name="firstName"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.firstName || ""}
                  placeholder="Enter First Name"
                  id="firstName"
                />
                {errors.firstName && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.firstName?.message || "firstName is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  name="lastName"
                  type="text"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.lastName || ""}
                  placeholder="Enter Last Name"
                  id="lastName"
                />
                {errors.lastName && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.lastname?.message || "lastname is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  gender
                </label>
                <select
                  {...register("gender", { required: true })}
                  type="text"
                  name="gender"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  id="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.gender?.message || "gender is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="dateOfBirth"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth", { required: true })}
                  name="dateOfBirth"
                  type="date"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.dateOfBirth || ""}
                  placeholder="DD/MM/YYYY"
                  id="dateOfBirth"
                />
                {errors.dateOfBirth && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.dateOfBirth?.message || "date of birth is required"}
                  </p>
                )}
              </div>
            </div>
            <div className=" flex flex-col md:flex-row gap-2 md:gap-4 ">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="about"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  About
                </label>
                <input
                  {...register("about", { required: true })}
                  type="text"
                  name="about"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.about || ""}
                  placeholder="write something about you"
                  id="about"
                />
                {errors.about && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.about?.message || "About is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="address"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  Address
                </label>
                <input
                  {...register("address", { required: true })}
                  name="address"
                  type="text"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.address || ""}
                  placeholder="Enter Address"
                  id="address"
                />
                {errors.address && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.address?.message || "address is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="phone md:w-[70%] xl:w-[60%] flex flex-col gap-2">
              <label htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode")}
                  className="bg-gray-700 px-1 md:px-2 lg:px-4  py-2 text-md md:text-lg lg:text-2xl w-[45%] md:w-[30%]  rounded-lg text-gray-200"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code} - {country.name}
                    </option>
                  ))}
                </select>
                <input
                  defaultValue={user?.additionalDetails?.contactNumber || ""}
                  className="bg-gray-700 px-5 py-2 text-md md:text-lg lg:text-2xl  w-full rounded-lg text-gray-200"
                  type="number"
                  name="contactNumber"
                  placeholder="Enter Phone Number"
                  {...register("contactNumber", { required: true })}
                />
              </div>
              {errors.contactNumber && (
                <p role="alert" className="text-red-500 text-sm ">
                  {errors.contactNumber?.message ||
                    "contact number is required"}
                </p>
              )}
            </div>
            <div className="flex gap-2 md:gap-4 mt-4 md:mt-8">
              <input
                type="submit"
                className="bg-yellow-300 cursor-pointer font-semibold w-full md:w-fit justify-center flex gap-2 items-center text-black px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
                value="Save"
              />
              <input
                type="reset"
                value="Cancel"
                className="bg-gray-700 cursor-pointer font-semibold w-full md:w-fit justify-center flex gap-2 items-center text-gray-300 px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
              />
            </div>
          </form>
        </div>
      </section>
  )
};

export default EditDetails;
