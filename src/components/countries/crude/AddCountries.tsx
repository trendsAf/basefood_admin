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
import {
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface CountryFormValues {
  country_name?: string;
  country_code?: string;
  isInDarkMode: boolean;
  toggleAddCountry: () => void;
}

const AddCountry = ({ toggleAddCountry, isInDarkMode }: CountryFormValues) => {
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
      // console.error("Failed to add country:", error);
      toast.error(error.message);
    }
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value;
    const country = countries.find((c) => c.name === selectedCountry);
    if (country) {
      setValue("country_code", country.code);
      setValue("country_name", country.name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg  w-[40%] max-w-4xl  shadow-lg">
        <div className="flex items-center justify-between ">
          <div className="w-full relative py-4">
            <h2 className="text-2xl font-medium text-center text-gray-900 dark:text-white">
              Add Country
            </h2>
            <div className=" absolute top-2 right-2">
              <button
                onClick={() => toggleAddCountry()}
                className=" text-brand-blue  dark:text-white text-4xl "
              >
                <IoMdClose className="hover:text-red" />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-8 py-3 pb-8"
        >
          <div className="flex items-center gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Country Name</InputLabel>
              <Select
                {...register("country_name", {
                  required: "Country name is required",
                })}
                onChange={handleCountryChange}
                label="Country Name"
                defaultValue=""
                sx={{
                  "& .MuiInputBase-root": {
                    color: isInDarkMode ? "white" : "initial",
                    padding: "0 0",
                  },
                }}
              >
                <MenuItem value="">Select a country</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country_name && (
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.country_name.message} */}
                </p>
              )}
            </FormControl>

            <TextField
              {...register("country_code", {
                required: "Country code is required",
              })}
              label="Country Code"
              fullWidth
              size="small"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.country_code}
              helperText={errors.country_code?.message}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{/* {error} */}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-brand-blue text-white rounded-lg font-narmal hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Country"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
