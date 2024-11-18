import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCropsCategory } from "../../../redux/reducers/crops/cropCategorySlice";
import { crop } from "../../../redux/reducers/crops/cropSlice";

interface CropFormValues {
  crop_name?: string;
  crop_category_id?: string;
  toggleAddCrop: () => void;
}

const AddCrop = ({ toggleAddCrop }: CropFormValues) => {
  const dispatch = useAppDispatch();
  const { error, cropCategoryList } = useAppSelector(
    (state) => state.cropCategory,
  );

  const { isLoading } = useAppSelector((state) => state.crops);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CropFormValues>({
    defaultValues: {
      crop_category_id: "",
    },
  });

  // Fetch crop categories when component mounts
  useEffect(() => {
    dispatch(getCropsCategory());
  }, [dispatch]);

  const onSubmit = async (data: CropFormValues) => {
    // console.log("Submitting data:", data);
    try {
      const result = await dispatch(crop(data)).unwrap();
      toast.success(result.message);
      reset();
      toggleAddCrop();
    } catch (error: any) {
      // console.error("Failed to add crop:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddCrop()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add Crop
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          {/* Crop Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Crop Name
            </label>
            <Controller
              name="crop_name"
              control={control}
              rules={{ required: "Crop name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter crop name"
                  error={!!errors.crop_name}
                  helperText={errors.crop_name?.message}
                  className="w-full"
                />
              )}
            />
          </div>

          {/* Crop Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Crop Category
            </label>
            <FormControl fullWidth error={!!errors.crop_category_id}>
              <InputLabel>Select crop category</InputLabel>
              <Controller
                name="crop_category_id"
                control={control}
                rules={{ required: "Crop category is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select crop category"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select crop category
                    </MenuItem>
                    {cropCategoryList.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.crop_category_id && (
                <p>{errors.crop_category_id.message}</p>
              )}
            </FormControl>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Crop"
            )}
          </button>

          {/* Error Display */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
