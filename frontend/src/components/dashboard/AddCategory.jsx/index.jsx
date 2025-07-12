import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {createCategory} from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn";
export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const token = localStorage.getItem("token");

  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    const response=await createCategory(data,token);
    console.log(response);
    reset()
  };
  return (
    <div className="w-full h-auto mx-auto my-8 max-w-xl">
    <h1 className="mb-4 text-xl md:text-3xl font-bold text-white">Add New Category</h1>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-gray-700 bg-gray-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-50" htmlFor="categoryName">
          Category Name <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="categoryName"
          placeholder="Enter Category Name"
          {...register("name", { required: true })}
          className="form-style w-full bg-gray-600 rounded-lg px-2 py-1 md:px-4 md:py-2"
        />
        {errors.name && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Category name is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-50" htmlFor="categoryDescription">
          Category Description Description{" "}
          <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="categoryDescription"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full  bg-gray-600 rounded-lg px-2 py-1 md:px-4 md:py-2"
        />
        {errors.description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Category Description is required
          </span>
        )}
      </div>

      <IconBtn type="submit" text={"Add"}>
        <FaPlus />
      </IconBtn>
    </form>
    </div>
  );
}
