/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PostCountry } from "../../../redux/reducers/countries/countrySlice";
import { IoMdClose } from "react-icons/io";

interface CountryFormValues {
  country_name?: string;
  country_code?: number;
  toggleAddCountry: () => void;
}

const AddCountry = ({ toggleAddCountry }: CountryFormValues) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormValues>();

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.countries);

  const onSubmit = async (data: CountryFormValues) => {
    console.log(data);
    try {
      await dispatch(PostCountry(data)).unwrap();
      toggleAddCountry();
    } catch (err) {
      console.error("Failed to add country:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddCountry()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-4xl mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold   text-gray-900 dark:text-white">
            Add country
          </h2>
          <button
            onClick={toggleAddCountry}
            className="bg-bg-gray rounded px-3 text-brand-blue hover:text-red dark:text-white dark:bg-black flex items-center justify-center text-xl py-2 dark:hover:bg-[#161616]"
          >
            <IoMdClose />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Country name
              </label>
              <input
                {...register("country_name", {
                  required: "Country name is required",
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter country name"
              />
              {errors.country_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country_name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Country code
              </label>
              <input
                {...register("country_code", {
                  required: "Country code is required",
                  // valueAsNumber: false,
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter country code"
              />
              {errors.country_code && (
                <p className="text-red text-sm">
                  {errors.country_code.message}
                </p>
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-brand-blue text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add country"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
