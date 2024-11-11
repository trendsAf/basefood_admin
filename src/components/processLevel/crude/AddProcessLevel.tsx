/* eslint-disable no-console */
import { useForm } from "react-hook-form";

interface CropCategoryFormValues {
  crop_id?: number;
  crop_category_id?: number;
  process_state?: string;
  toggleAddProcessLevel: () => void;
}

const AddProcessLevel = ({ toggleAddProcessLevel }: CropCategoryFormValues) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropCategoryFormValues>();

  const onSubmit = (data: CropCategoryFormValues) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddProcessLevel()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add process
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop id
              </label>
              <input
                {...register("crop_id", {
                  required: "crop id is required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter crop id"
              />
              {errors.crop_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.crop_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop category id
              </label>
              <input
                {...register("crop_category_id", {
                  required: "crop category id is required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter crop category id"
              />
              {errors.crop_category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.crop_category_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop process state
              </label>
              <input
                {...register("process_state", {
                  required: "crop process state is required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter crop process state"
              />
              {errors.process_state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.process_state.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add crop
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProcessLevel;
