/* eslint-disable no-console */
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface CropCategoryFormValues {
  crop_id?: number;
  crop_category_id?: number;
  process_state?: string;
  toggleAddProcessLevel: () => void;
}

const AddProcessLevel = ({ toggleAddProcessLevel }: CropCategoryFormValues) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropCategoryFormValues>();

  const onSubmit = (data: CropCategoryFormValues) => {
    console.log(data);
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
            {/* Crop id Input (MUI TextField) */}
            <div>
              <TextField
                {...register("crop_id", { required: "Crop ID is required" })}
                label="Crop ID"
                variant="outlined"
                fullWidth
                error={!!errors.crop_id}
                helperText={errors.crop_id?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>

            {/* Crop category id Input (MUI TextField) */}
            <div>
              <TextField
                {...register("crop_category_id", {
                  required: "Crop category ID is required",
                })}
                label="Crop Category ID"
                variant="outlined"
                fullWidth
                error={!!errors.crop_category_id}
                helperText={errors.crop_category_id?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>

            {/* Crop process state Input (MUI TextField) */}
            <div>
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
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add process
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProcessLevel;
