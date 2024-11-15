/* eslint-disable no-console */
import { useForm } from "react-hook-form";

interface RegionFormValues {
  variety_name?: string;
  crop_id?: number;
  toggleAddVariety: () => void;
}

const AddVariety = ({ toggleAddVariety }: RegionFormValues) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegionFormValues>();

  const onSubmit = (data: RegionFormValues) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddVariety()}
      ></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add Variety
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Crop
              </label>
              <select
                {...register("crop_id", {
                  required: "crop id is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#252525] dark:text-white"
              >
                <option value="">Select a crop</option>
                {[{ name: "maize", id: 1 }].map((crop) => (
                  <option key={crop.id} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
              {errors.crop_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.crop_id.message}
                </p>
              )}
            </div>

            {/* Country Region Input */}
            <div className="w-full">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Variety name
              </label>
              <input
                {...register("variety_name", {
                  required: "variety name required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#252525] dark:text-white"
                placeholder="Enter crop variety"
              />
              {errors.variety_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.variety_name.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add variety
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVariety;
