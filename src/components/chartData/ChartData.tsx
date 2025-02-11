import Papa from "papaparse";
import React, { ChangeEvent, DragEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CsvPreviewTable from "../common/tables/CsvPreviewTable";

const ChartData: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [csvData, setCsvData] = useState<string[][] | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      parseCsvFile(selectedFile);
    } else {
      toast.error("Only CSV files are allowed!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFile(null);
      setCsvData(null);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
      parseCsvFile(droppedFile);
    } else {
      toast.error("Only CSV files are allowed!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFile(null);
      setCsvData(null);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const parseCsvFile = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data as string[][]);
      },
      error: (error) => {
        toast.error(`Error parsing CSV: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      },
    });
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("No file selected. Please upload a CSV file.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    toast.success("File uploaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Clear file and data after submission
    setFile(null);
    setCsvData(null);
  };

  const handleClear = () => {
    setFile(null);
    setCsvData(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-[#252525]">
      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 ${
          dragging ? "border-blue-500" : "border-gray-300"
        } border-dashed rounded-lg bg-gray-50 dark:bg-[#444444] p-4`}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag and Drop assets here
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Or</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          Browse
        </label>
      </div>

      {/* Modal for Table and Buttons */}
      {csvData && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12  bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-normal text-gray-800 dark:text-white">
              CSV Data Preview
            </h2>
            <button
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
          <CsvPreviewTable csvData={csvData} />
          <div className="mx-auto flex flex-col w-full items-center mt-4">
            <button
              onClick={handleUpload}
              className="px-4 w-1/2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChartData;
