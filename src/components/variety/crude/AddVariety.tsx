import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FetchVarieties,
  PostVariety,
} from "../../../redux/reducers/variety/varietySlice";
import { useEffect, useState } from "react";
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";

interface VarietyFormValues {
  image?: string;
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
      <div className="w-full h-full absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="bg-white dark:bg-[#252525] rounded-lg  w-[40%] max-w-4xl mx-4 _shadow">
        <div className="flex items-center justify-between ">
          <div className="w-full relative py-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white ml-40">
              Add Variety
            </h2>
            <div className=" absolute top-2 right-2">
              <button
                onClick={() => toggleAddVariety()}
                className=" text-brand-blue  dark:text-white text-4xl  "
              >
                <IoMdClose className="hover:text-red" />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  gap-6 px-8 pb-6"
        >
          {/* Image Upload */}
          <div className="w-1/2 mb-4">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              {...register("image", { required: "Image is required" })}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-40 px-4 py-6 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all text-gray-600 dark:text-gray-300 text-sm ${
                imagePreview
                  ? "bg-cover bg-center"
                  : "bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444]"
              }`}
              style={
                imagePreview
                  ? { backgroundImage: `url(${imagePreview})` }
                  : undefined
              }
            >
              {!imagePreview && (
                <>
                  <CloudUpload fontSize="large" className="mb-2" />
                  <span>Upload an image</span>
                </>
              )}
            </label>
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col mb-4 justify-between">
            <div className="flex flex-col items-center gap-6">
              <FormControl
                fullWidth
                error={!!errors.crop_id}
                variant="outlined"
                size="small"
              >
                <InputLabel>Select a crop</InputLabel>
                <Select
                  {...register("crop_id", { required: "Crop is required" })}
                  label="Select a crop"
                  className="dark:bg-[#252525] dark:text-white"
                  disabled={cropLoading}
                  defaultValue={""}
                  size="small"
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
                      Array.isArray(cropList) && cropList?.length === 0 ? (
                        <MenuItem>No crops available</MenuItem>
                      ) : (
                        Array.isArray(cropList) &&
                        cropList?.map((crop: any) => (
                          <MenuItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </MenuItem>
                        ))
                      ),
                    ]
                  )}
                </Select>
                {errors.crop_id && (
                  <FormHelperText>{errors.crop_id.message}</FormHelperText>
                )}
              </FormControl>

              {/* Variety Name Input (MUI TextField) */}
              <TextField
                {...register("crop_variety_name", {
                  required: "Variety name is required",
                })}
                label="Variety name"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.crop_variety_name}
                helperText={errors.crop_variety_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-brand-blue text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding variety..." : "Add variety"}
            </button>

            {/* Error Handling */}
            {error && (
              <div className="mt-4 text-red-500 text-center">{error}</div>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddVariety;
