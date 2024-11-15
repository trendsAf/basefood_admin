/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FetchCountries,
  PostCountry,
} from "../../../redux/reducers/countries/countrySlice";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries } from "../../../utils/countriesData";

interface CountryFormValues {
  country_name?: string;
  country_code?: string;
  toggleAddCountry: () => void;
}

const AddCountry = ({ toggleAddCountry }: CountryFormValues) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CountryFormValues>();

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.countries || []);

  const onSubmit = async (data: CountryFormValues) => {
    try {
      const res = await dispatch(PostCountry(data)).unwrap();
      toast.success(res.message);
      dispatch(FetchCountries());
      toggleAddCountry();
    } catch (error: any) {
      console.error("Failed to add country:", error);
      toast.error(error.message);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const country = countries.find((c) => c.name === selectedCountry);
    if (country) {
      setValue("country_code", country.code);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddCountry()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-4xl mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add country
          </h2>
          <button
            onClick={toggleAddCountry}
            className="bg-bg-gray rounded px-3 text-brand-blue hover:text-red dark:text-white dark:bg-black flex items-center justify-center text-xl py-2 dark:hover:bg-[#161616]"
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Country name
              </label>
              <select
                {...register("country_name", {
                  required: "Country name is required",
                })}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
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
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter country code"
                disabled
              />
              {errors.country_code && (
                <p className="text-red-500 text-sm mt-1">
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
