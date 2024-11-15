/* eslint-disable no-console */
// import { useEffect } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { crop } from "../../../redux/reducers/crops/cropSlice";
import { getCropsCategory } from "../../../redux/reducers/crops/cropCategorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CropFormValues {
  crop_name?: string;
  crop_category_id?: string;
  toggleAddCrop: () => void;
}

const AddCrop = ({ toggleAddCrop }: CropFormValues) => {
  const dispatch = useAppDispatch();
  const { error, cropCategoryList } = useAppSelector(
    (state) => state.cropCategory,
  );

  const { isLoading } = useAppSelector((state) => state.crops);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CropFormValues>();

  // Fetch crop categories when component mounts
  useEffect(() => {
    dispatch(getCropsCategory());
  }, [dispatch]);

  const onSubmit = async (data: CropFormValues) => {
    console.log("Submitting data:", data);
    try {
      const result = await dispatch(crop(data)).unwrap();
      toast.success(result.message);
      reset();
      toggleAddCrop();
    } catch (error: any) {
      console.error("Failed to add crop:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddCrop()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add crop
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop name
              </label>
              <input
                {...register("crop_name", {
                  required: "Crop name is required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter crop name"
              />
              {errors.crop_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.crop_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop category
              </label>
              <select
                {...register("crop_category_id", {
                  required: "Crop category is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select crop category</option>
                {cropCategoryList.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.crop_category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.crop_category_id.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding crop..." : "Add crop"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
