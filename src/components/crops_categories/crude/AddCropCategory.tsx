import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cropCategory,
  getCropsCategory,
} from "../../../redux/reducers/crops/cropCategorySlice";

interface CropCategoryFormValues {
  category_code?: string;
  category_name?: string;
  toggleAddCropCategory: () => void;
}

const AddCropCategory = ({ toggleAddCropCategory }: CropCategoryFormValues) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.cropCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropCategoryFormValues>();

  const onSubmit = async (data: CropCategoryFormValues) => {
    try {
      const res = await dispatch(cropCategory(data)).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        toggleAddCropCategory();
      }, 3500);
      dispatch(getCropsCategory());
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg pb-6 w-[40%] max-w-4xl mx-4 _shadow">
        <div className="relative py-4">
          <h2 className="text-2xl font-medium mb-2 text-center text-gray-900 dark:text-white">
            Add Category
          </h2>
          <div className="absolute top-2 right-2 text-4xl">
            <button
              onClick={() => toggleAddCropCategory()}
              className=" text-brand-blue  dark:text-white text-4xl "
            >
              <IoMdClose className="hover:text-red" />
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-8 pb-4"
        >
          <div className="space-y-4">
            <div>
              <TextField
                {...register("category_name", {
                  required: "Crop category is required",
                })}
                label="Category Name"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.category_name}
                helperText={errors.category_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
            <div>
              <TextField
                {...register("category_code", {
                  required: "Crop category code is required",
                })}
                label="Category code"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.category_code}
                helperText={errors.category_code?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-brand-blue text-white rounded-lg font-normal hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? "Adding category..." : "Add category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCropCategory;
