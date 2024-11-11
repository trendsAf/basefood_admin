/* eslint-disable no-console */
import { useForm } from "react-hook-form";

interface CropFormValues {
  crop_name?: string;
  toggleAddCrop: () => void;
}

const AddCrop = ({ toggleAddCrop }: CropFormValues) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropFormValues>();

  const onSubmit = (data: CropFormValues) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  required: "crop name is required",
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

export default AddCrop;
