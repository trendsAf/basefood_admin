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
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import {
  FetchProcessLevel,
  PostProcessLevel,
} from "../../../redux/reducers/processLevel/processLevelSlice";
import { FetchVarieties } from "../../../redux/reducers/variety/varietySlice";

interface CropCategoryFormValues {
  crop_id?: number | "";
  crop_variety_id?: number | "";
  process_state?: string;
  toggleAddProcessLevel: () => void;
}

// Inside your AddProcessLevel component

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
      crop_variety_id: "",
    },
  });

  const dispatch = useAppDispatch();

  const crop_id = watch("crop_id");
  const crop_variety_id = watch("crop_variety_id");

  const { cropList } = useAppSelector((state) => state.crops);
  const { data: varieties } = useAppSelector((state) => state.viriety);
  const { isLoading, error } = useAppSelector((state) => state.processLevel);

  useEffect(() => {
    dispatch(getCrops());
    dispatch(FetchVarieties());
  }, [dispatch]);

  const filteredVarieties = Array.isArray(varieties)
    ? varieties.filter((variety: any) => variety.crop_id === crop_id)
    : [];

  const onSubmit = async (data: CropCategoryFormValues) => {
    try {
      const res = await dispatch(PostProcessLevel(data)).unwrap();
      toast.success(res.message);
      dispatch(FetchProcessLevel());
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
                onChange={(e) => {
                  setValue("crop_id", e.target.value as number);
                  setValue("crop_variety_id", "");
                }}
                label="Select a Crop"
                className="dark:bg-[#252525] dark:text-white"
              >
                <MenuItem value="">
                  <em>Select a Crop</em>
                </MenuItem>
                {Array.isArray(cropList) && cropList?.length === 0 ? (
                  <MenuItem>No categories found</MenuItem>
                ) : (
                  cropList?.map((crop: any) => (
                    <MenuItem key={crop.id} value={crop.id} defaultValue={""}>
                      {crop.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.crop_id && (
                <FormHelperText>{errors.crop_id.message}</FormHelperText>
              )}
            </FormControl>

            {/* Crop Variety Dropdown */}
            <FormControl
              fullWidth
              error={!!errors.crop_variety_id}
              variant="outlined"
            >
              <InputLabel>Select a Crop Variety</InputLabel>
              <Select
                {...register("crop_variety_id", {
                  required: "Crop Variety ID is required",
                })}
                value={crop_variety_id}
                onChange={(e) =>
                  setValue("crop_variety_id", e.target.value as number)
                }
                label="Select a Crop Variety"
                className="dark:bg-[#252525] dark:text-white"
              >
                <MenuItem value="">
                  <em>Select a Crop Variety</em>
                </MenuItem>
                {Array.isArray(filteredVarieties) &&
                filteredVarieties?.length === 0 ? (
                  <MenuItem>No categories found</MenuItem>
                ) : (
                  Array.isArray(filteredVarieties) &&
                  filteredVarieties?.map((variety: any) => (
                    <MenuItem
                      key={variety.id}
                      value={variety.id}
                      defaultValue={""}
                    >
                      {variety.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.crop_variety_id && (
                <FormHelperText>
                  {errors.crop_variety_id.message}
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
