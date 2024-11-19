import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FetchVarieties,
  PostVariety,
} from "../../../redux/reducers/variety/varietySlice";
import { useEffect } from "react";
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import { toast, ToastContainer } from "react-toastify";

interface VarietyFormValues {
  crop_variety_name?: string;
  crop_id?: number;
  toggleAddVariety: () => void;
}

const AddVariety = ({ toggleAddVariety }: VarietyFormValues) => {
  const dispatch = useAppDispatch();

  // Access the crops and loading state from Redux store
  const { cropList, isLoading: cropLoading } = useAppSelector(
    (state) => state.crops,
  );
  const { isLoading, error } = useAppSelector((state) => state.viriety);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        await dispatch(getCrops()).unwrap();
      } catch (error) {
        toast.error("Failed to load crops. Please try again.");
      }
    };

    fetchCrops();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VarietyFormValues>();

  const onSubmit = async (data: VarietyFormValues) => {
    try {
      const res = await dispatch(PostVariety(data)).unwrap();
      toast.success(res.message);
      dispatch(FetchVarieties());
      setTimeout(() => {
        toggleAddVariety();
      }, 3800);
    } catch (error: any) {
      toast.error(error.message);
    }
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
                  disabled={cropLoading}
                  defaultValue={""}
                >
                  {cropLoading ? (
                    <MenuItem value="">
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    [
                      <MenuItem value="" key="default">
                        <em>Select a crop</em>
                      </MenuItem>,
                      cropList.map((crop: any) => (
                        <MenuItem key={crop.id} value={crop.id}>
                          {crop.name}
                        </MenuItem>
                      )),
                    ]
                  )}
                </Select>
                {errors.crop_id && (
                  <FormHelperText>{errors.crop_id.message}</FormHelperText>
                )}
              </FormControl>
            </div>

            {/* Variety Name Input (MUI TextField) */}
            <div className="w-full">
              <TextField
                {...register("crop_variety_name", {
                  required: "Variety name is required",
                })}
                label="Variety name"
                variant="outlined"
                fullWidth
                error={!!errors.crop_variety_name}
                helperText={errors.crop_variety_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding variety..." : "Add variety"}
          </button>

          {/* Error Handling */}
          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddVariety;
