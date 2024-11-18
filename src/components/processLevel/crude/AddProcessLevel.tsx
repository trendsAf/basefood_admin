import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCropsCategory } from "../../../redux/reducers/crops/cropCategorySlice";
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import { PostProcessLevel } from "../../../redux/reducers/processLevel/processLevelSlice";

interface CropCategoryFormValues {
  crop_id?: number | "";
  crop_category_id?: number | "";
  process_state?: string;
  toggleAddProcessLevel: () => void;
}

const AddProcessLevel = ({ toggleAddProcessLevel }: CropCategoryFormValues) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CropCategoryFormValues>({
    defaultValues: {
      crop_id: "",
      crop_category_id: "",
    },
  });

  const dispatch = useAppDispatch();

  const crop_id = watch("crop_id");
  const crop_category_id = watch("crop_category_id");

  const { cropList } = useAppSelector((state) => state.crops);
  const { cropCategoryList } = useAppSelector((state) => state.cropCategory);
  const { isLoading, error } = useAppSelector((state) => state.processLevel);

  useEffect(() => {
    dispatch(getCrops());
  }, []);
  useEffect(() => {
    dispatch(getCropsCategory());
  }, []);

  const onSubmit = async (data: CropCategoryFormValues) => {
    try {
      const res = await dispatch(PostProcessLevel(data)).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        toggleAddProcessLevel();
      }, 3800);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddProcessLevel()}
      ></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add Process
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            {/* Crop Dropdown */}
            <FormControl fullWidth error={!!errors.crop_id} variant="outlined">
              <InputLabel>Select a Crop</InputLabel>
              <Select
                {...register("crop_id", { required: "Crop ID is required" })}
                value={crop_id}
                onChange={(e) => setValue("crop_id", e.target.value as number)}
                label="Select a Crop"
                className="dark:bg-[#252525] dark:text-white"
              >
                <MenuItem value="">
                  <em>Select a Crop</em>
                </MenuItem>
                {cropList.map((crop: any) => (
                  <MenuItem key={crop.id} value={crop.id}>
                    {crop.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.crop_id && (
                <FormHelperText>{errors.crop_id.message}</FormHelperText>
              )}
            </FormControl>

            {/* Crop Category Dropdown */}
            <FormControl
              fullWidth
              error={!!errors.crop_category_id}
              variant="outlined"
            >
              <InputLabel>Select a Crop Category</InputLabel>
              <Select
                {...register("crop_category_id", {
                  required: "Crop Category ID is required",
                })}
                value={crop_category_id}
                onChange={(e) =>
                  setValue("crop_category_id", e.target.value as number)
                }
                label="Select a Crop Category"
                className="dark:bg-[#252525] dark:text-white"
              >
                <MenuItem value="">
                  <em>Select a Crop Category</em>
                </MenuItem>
                {cropCategoryList.map((category: any) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.crop_category_id && (
                <FormHelperText>
                  {errors.crop_category_id.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* Process State Input */}
            <TextField
              {...register("process_state", {
                required: "Crop process state is required",
              })}
              label="Crop Process State"
              variant="outlined"
              fullWidth
              error={!!errors.process_state}
              helperText={errors.process_state?.message}
              className="dark:bg-[#252525] dark:text-white"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {typeof error === "string" ? error : "An error occurred."}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add Process"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProcessLevel;
