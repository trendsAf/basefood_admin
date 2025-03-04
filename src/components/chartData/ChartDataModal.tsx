import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PostAnalytics } from "../../redux/reducers/products/analiticSlice";

interface IFormInput {
  file_id: string;
}

interface ModalProps {
  toggleModal: () => void;
}

const schema = yup.object().shape({
  file_id: yup.string().required("Input is required"),
});

const ChartDataModal = ({ toggleModal }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.analytics);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      const res = await dispatch(PostAnalytics(formData.file_id));
      if (res) {
        toast.success(res?.payload?.message);
        setTimeout(() => {
          toggleModal();
        }, 3500);
        reset();
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full fixed inset-0 bg-black/20 backdrop-blur-sm text-black">
        <div className="relative rounded-2xl border-dashed flex flex-col bg-white _shadow w-1/3 p-6">
          <div className="absolute top-2 right-2">
            <IoClose
              className="text-4xl text-black hover:text-red cursor-pointer"
              onClick={toggleModal}
            />
          </div>
          <h1 className="text-black text-2xl font-bold mb-4">Add data</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              {...register("file_id")}
              className="px-4 py-2 border-2 border-gray-300 rounded-sm w-full"
              placeholder="Enter File ID "
            />
            {errors.file_id && (
              <p className="text-red-500 text-xs">{errors.file_id.message}</p>
            )}

            <button
              type="submit"
              className={`bg-brand-blue px-6 py-2 w-full rounded-sm ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChartDataModal;
