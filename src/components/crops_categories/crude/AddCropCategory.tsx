/* eslint-disable no-console */
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { FetchCountries } from "../../../redux/reducers/countries/countrySlice";
import { cropCategory } from "../../../redux/reducers/crops/cropCategorySlice";

interface CropCategoryFormValues {
  crop_category_name?: string;
  toggleAddCropCategory: () => void;
}

const AddCropCategory = ({ toggleAddCropCategory }: CropCategoryFormValues) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.cropCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropCategoryFormValues>();

  const onSubmit = async (data: CropCategoryFormValues) => {
    try {
      await dispatch(cropCategory(data)).unwrap();
      toggleAddCropCategory();
      dispatch(FetchCountries());
    } catch (error) {
      console.error("Failed to add crop:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"
        onClick={() => toggleAddCropCategory()}
      ></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg p-6 w-full max-w-4xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add Category
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-4">
            <div>
              <TextField
                {...register("crop_category_name", {
                  required: "Crop category is required",
                })}
                label="Category Name"
                variant="outlined"
                fullWidth
                error={!!errors.crop_category_name}
                helperText={errors.crop_category_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
          </div>

          {/* Display loading state */}
          {isLoading && (
            <p className="text-blue-500 text-center">Adding category...</p>
          )}

          {/* Display error if present */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCropCategory;
