import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";

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
    // eslint-disable-next-line no-console
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
            {/* Crop Dropdown (MUI Select) */}
            <div>
              <FormControl
                fullWidth
                error={!!errors.crop_id}
                variant="outlined"
              >
                <InputLabel>Select a crop</InputLabel>
                <Select
                  {...register("crop_id", { required: "Crop is required" })}
                  label="Select a crop"
                  className="dark:bg-[#252525] dark:text-white"
                >
                  <MenuItem value="">
                    <em>Select a crop</em>
                  </MenuItem>
                  {[{ name: "maize", id: 1 }].map((crop) => (
                    <MenuItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.crop_id && (
                  <FormHelperText>{errors.crop_id.message}</FormHelperText>
                )}
              </FormControl>
            </div>

            {/* Variety Name Input (MUI TextField) */}
            <div className="w-full">
              <TextField
                {...register("variety_name", {
                  required: "Variety name is required",
                })}
                label="Variety name"
                variant="outlined"
                fullWidth
                error={!!errors.variety_name}
                helperText={errors.variety_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
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
