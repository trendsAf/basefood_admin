import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { FetchCountries } from "../../../redux/reducers/countries/countrySlice";
import {
  getRegions,
  PostRegion,
} from "../../../redux/reducers/regions/regionSlice";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";

interface RegionFormValues {
  country_id?: string;
  region_name?: string;
  toggleAddRegion: () => void;
}

const AddRegion = ({ toggleAddRegion }: RegionFormValues) => {
  const { data: countries } = useAppSelector((state) => state.countries);
  const { isLoading, error } = useAppSelector((state) => state.regions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchCountries());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegionFormValues>();

  const onSubmit = async (data: RegionFormValues) => {
    try {
      const res = await dispatch(PostRegion(data)).unwrap();
      toast.success(res.message || "Region added successfully!");
      dispatch(getRegions());
      setTimeout(() => {
        toggleAddRegion();
      }, 3800);

      reset();
    } catch (err: any) {
      const errorMessage =
        err?.message || "Something went wrong, please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg  w-[40%] max-w-4xl _shadow">
        <div className="flex items-center justify-between ">
          <div className="w-full relative py-4">
            <h2 className="text-2xl font-medium text-center text-gray-900 dark:text-white">
              Add Region
            </h2>
            <div className=" absolute top-2 right-2">
              <button
                onClick={() => toggleAddRegion()}
                className=" text-brand-blue  dark:text-white text-4xl "
              >
                <IoMdClose className="hover:text-red" />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-8 py-4 pb-8"
        >
          <div className="flex items-center gap-4">
            {/* Country Select Input */}
            <FormControl fullWidth size="small" error={!!errors.country_id}>
              <InputLabel>Select a country</InputLabel>
              <Select
                {...register("country_id", {
                  required: "Country name is required",
                })}
                defaultValue=""
                label="Select a country"
                className="dark:bg-[#252525] dark:text-white"
              >
                <MenuItem value="">
                  <em>Select a country</em>
                </MenuItem>
                {Array.isArray(countries) && countries?.length === 0 ? (
                  <MenuItem>No country found</MenuItem>
                ) : (
                  Array.isArray(countries) &&
                  countries?.map((country: any) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.country_id && (
                <FormHelperText>{errors.country_id.message}</FormHelperText>
              )}
            </FormControl>

            {/* Country Region Input */}
            <TextField
              {...register("region_name", {
                required: "Region is required",
              })}
              type="text"
              label="Country region"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.region_name}
              helperText={errors.region_name?.message}
              InputLabelProps={{ className: "dark:text-gray-300" }}
              className="dark:bg-[#252525] dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {/* {typeof error === "string" ? error : "Failed to add region"} */}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-brand-blue text-white rounded-lg font-normal hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Adding Region..." : "Add Region"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRegion;
