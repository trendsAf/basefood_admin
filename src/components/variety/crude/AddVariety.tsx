import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import { CloudUpload } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FetchVarieties,
  PostVariety,
} from "../../../redux/reducers/variety/varietySlice";
import {
  useEffect,
  // useState
} from "react";
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";

interface VarietyFormValues {
  crop_code?: string;
  variety_name?: string;
  variety_code?: number;
  toggleAddVariety: () => void;
}

const AddVariety = ({ toggleAddVariety }: VarietyFormValues) => {
  const dispatch = useAppDispatch();
  const { cropList, isLoading: cropLoading } = useAppSelector(
    (state) => state.crops,
  );
  const { isLoading, error } = useAppSelector((state) => state.viriety);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        await dispatch(getCrops()).unwrap();
      } catch (error: any) {
        toast.error("Failed to load crops. Please try again.", error?.message);
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
            <h2 className="text-2xl font-medium text-center text-gray-900 dark:text-white ml-40">
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
          <div className="w-full flex flex-col mb-4 justify-between">
            <div className="flex flex-col items-center gap-6">
              <FormControl
                fullWidth
                error={!!errors.crop_code}
                variant="outlined"
                size="small"
              >
                <InputLabel>Select a crop</InputLabel>
                <Select
                  {...register("crop_code", { required: "Crop is required" })}
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
                {errors.crop_code && (
                  <FormHelperText>{errors.crop_code.message}</FormHelperText>
                )}
              </FormControl>

              <TextField
                {...register("variety_name", {
                  required: "Variety name is required",
                })}
                label="Variety name"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.variety_name}
                helperText={errors.variety_name?.message}
                className="dark:bg-[#252525] dark:text-white"
              />

              <TextField
                {...register("variety_code", {
                  required: "Variety code is required",
                })}
                label="Variety code"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.variety_code}
                helperText={errors.variety_code?.message}
                className="dark:bg-[#252525] dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-brand-blue text-white rounded-lg font-normal hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding variety..." : "Add variety"}
            </button>

            {error && (
              <div className="mt-4 text-red-500 text-center">
                {/* {error} */}
              </div>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddVariety;
