/* eslint-disable no-console */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { ProductFormValidation } from "../../../validations/formValidations";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface AddProductModalProps {
  toggleAddProduct: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  toggleAddProduct,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductFormValidation),
  });

  // const dispatch = useAppDispatch();
  // const {cropList} = useAppSelector((state) => state.crops);

  const [imagePreview, setImagePreview] = useState("");

  const onSubmit = (data: any) => {
    console.log(data);
    toggleAddProduct();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-black rounded-lg p-6 w-full max-w-4xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl logo text-center ml-52 text-black dark:text-white w-full">
            Add New Crop
          </h2>
          <div className="absolute right-0 -top-2">
            <button
              onClick={() => toggleAddProduct()}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
            >
              <IoCloseSharp className="text-4xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-4"
        >
          <div className="flex gap-6">
            {/* Image Upload Section */}
            <div className="w-3/5 h-72 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#252525] hover:border-brand-blue transition relative">
              <label
                htmlFor="image"
                className="flex flex-col h-full w-full items-center cursor-pointer text-gray-700 dark:text-gray-300"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Crop Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400 mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h14m-6 4l4-4m0 0l-4-4m4 4H3"
                      />
                    </svg>
                    <span>Upload image</span>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {errors.image && (
                <p className="text-sm text-red mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Inputs Section */}
            <div className="flex flex-col gap-4 w-full">
              {/* Crop Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Crop Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="name"
                        {...field}
                        className="mt-1 block w-full bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                      />
                      {errors.name && (
                        <p className="text-sm text-red mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Country
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="country"
                        {...field}
                        className="mt-1 block w-full bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                      />
                      {errors.country && (
                        <p className="text-sm text-red mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Region */}
              <div className="flex flex-col">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Region
                </label>
                <Controller
                  name="region"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="region"
                        {...field}
                        className="mt-1 block w-full bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                      />
                      {errors.region && (
                        <p className="text-sm text-red mt-1">
                          {errors.region.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Crop Variety */}
              <div className="flex flex-col">
                <label
                  htmlFor="cropVariety"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Crop Variety
                </label>
                <Controller
                  name="cropVariety"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="cropVariety"
                        {...field}
                        className="mt-1 block w-full bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                      />
                      {errors.cropVariety && (
                        <p className="text-sm text-red mt-1">
                          {errors.cropVariety.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Price (per ton) */}
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Price (per ton)
                </label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="price"
                        {...field}
                        placeholder="$0.00"
                        className="mt-1 block w-full bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                      />
                      {errors.price && (
                        <p className="text-sm text-red mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 mt-2">
            <button
              type="submit"
              className="mb-5 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-600 transition w-3/5"
            >
              Add Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
