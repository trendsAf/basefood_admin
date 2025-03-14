import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cropCategory,
  getCropsCategory,
} from "../../../redux/reducers/crops/cropCategorySlice";
import { crop } from "../../../redux/reducers/crops/cropSlice";

interface CropFormValues {
  category_code?: string;
  crop_name?: string;
  crop_code?: string;
  toggleAddCrop: () => void;
}

const AddCrop = ({ toggleAddCrop }: CropFormValues) => {
  const dispatch = useAppDispatch();
  const { error, cropCategoryList } = useAppSelector(
    (state) => state.cropCategory,
  );

  useEffect(() => {
    dispatch(cropCategory);
  });
  const { isLoading } = useAppSelector((state) => state.crops);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CropFormValues>({
    defaultValues: {
      category_code: "",
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
      setTimeout(() => {
        reset();
        toggleAddCrop();
      }, 3500);
    } catch (error: any) {
      // console.error("Failed to add crop:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg pb-4 w-full md:w-1/2 xl:1/3 max-w-4xl mx-4 _shadow ">
        <div className="flex items-center justify-between ">
          <div className="w-full relative py-4">
            <h2 className="text-2xl font-medium text-center text-gray-900 dark:text-white">
              Add Crop
            </h2>
            <div className=" absolute top-2 right-2">
              <button
                onClick={() => toggleAddCrop()}
                className=" text-brand-blue  dark:text-white text-4xl "
              >
                <IoMdClose className="hover:text-red" />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-8 pb-4 py-2"
        >
          <div className="flex flex-col items-center gap-4">
            <FormControl fullWidth size="small" error={!!errors.category_code}>
              <InputLabel>Select crop category</InputLabel>
              <Controller
                name="category_code"
                control={control}
                rules={{ required: "Crop category is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    // label="Select crop category"
                    fullWidth
                    size="small"
                    displayEmpty
                  >
                    {Array.isArray(cropCategoryList) &&
                    cropCategoryList?.length === 0 ? (
                      <MenuItem>No categories found</MenuItem>
                    ) : (
                      Array.isArray(cropCategoryList) &&
                      cropCategoryList?.map((category: any) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.category_code && <p>{errors.category_code.message}</p>}
            </FormControl>

            <Controller
              name="crop_name"
              control={control}
              rules={{ required: "Crop name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Enter crop name"
                  error={!!errors.crop_name}
                  helperText={errors.crop_name?.message}
                  className="w-full"
                />
              )}
            />

            <Controller
              name="crop_code"
              control={control}
              rules={{ required: "Crop code is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Enter crop code"
                  error={!!errors.crop_code}
                  helperText={errors.crop_code?.message}
                  className="w-full"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-normal text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isLoading
                ? "bg-brand-blue cursor-not-allowed"
                : "bg-brand-blue hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding crop..." : "Add Crop"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {/* {error} */}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
