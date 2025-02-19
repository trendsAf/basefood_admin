import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import Papa from "papaparse";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PostAnalytics } from "../../redux/reducers/products/analiticSlice";

interface IFormInput {
  file_id: string;
}

interface ModalProps {
  toggleModal: () => void;
}

const schema = yup.object().shape({
  file_id: yup
    .string()
    .required("Input is required")
    .length(44, "File ID must be exactly 44 characters"),
});

const ChartDataModal = ({ toggleModal }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.analytics);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const fileId = watch("file_id");

  useEffect(() => {
    if (fileId && fileId.length === 44) {
      const csvUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      fetch(csvUrl)
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            complete: (result) => {
              if (result.data.length > 0) {
                setCsvHeaders(result.data[0] as string[]);
                setCsvData(result.data.slice(1) as string[][]);
              }
            },
            skipEmptyLines: true,
          });
        })
        .catch(() => {
          toast.error("Failed to fetch CSV file.");
        });
    }
  }, [fileId]);

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
              placeholder="Enter File ID (44 characters)"
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

          {csvHeaders.length > 0 && (
            <div className="mt-4 max-h-60 overflow-auto">
              <h2 className="text-lg font-semibold">CSV Preview</h2>
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {csvHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-2 py-1"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-2 py-1"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChartDataModal;
