/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

interface RegionFormValues {
  name?: string;
  region?: number;
  toggleAddRegion: () => void;
}

export const countries = [
  { code: "BDI", name: "Burundi" },
  { code: "COM", name: "Comoros" },
  { code: "COD", name: "Democratic Republic of the Congo" },
  { code: "DJI", name: "Djibouti" },
  { code: "EGY", name: "Egypt" },
  { code: "ERI", name: "Eritrea" },
  { code: "ETH", name: "Ethiopia" },
  { code: "KEN", name: "Kenya" },
  { code: "LBA", name: "Libya" },
  { code: "MDG", name: "Madagascar" },
  { code: "MWI", name: "Malawi" },
  { code: "MUS", name: "Mauritius" },
  { code: "RWA", name: "Rwanda" },
  { code: "SYC", name: "Seychelles" },
  { code: "SDN", name: "Sudan" },
  { code: "SWZ", name: "Eswatini" },
  { code: "UGA", name: "Uganda" },
  { code: "ZMB", name: "Zambia" },
  { code: "ZWE", name: "Zimbabwe" },
  { code: "SOM", name: "Somalia" },
  { code: "TUN", name: "Tunisia" },
];

const AddRegion = ({ toggleAddRegion }: RegionFormValues) => {
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
        onClick={() => toggleAddRegion()}
      ></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add Region
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            {/* Country Dropdown (MUI Select) */}
            <div>
              <FormControl fullWidth error={!!errors.name} variant="outlined">
                <InputLabel>Select a country</InputLabel>
                <Select
                  {...register("name", {
                    required: "Country name is required",
                  })}
                  label="Select a country"
                  className="dark:bg-[#252525] dark:text-white"
                >
                  <MenuItem value="">
                    <em>Select a country</em>
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.name && (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                )}
              </FormControl>
            </div>

            {/* Country Region Input */}
            <div className="w-full">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Country region
              </label>
              <input
                {...register("region", {
                  required: "Region is required",
                  valueAsNumber: true,
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#252525] dark:text-white"
                placeholder="Enter country region"
              />
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add region
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegion;
