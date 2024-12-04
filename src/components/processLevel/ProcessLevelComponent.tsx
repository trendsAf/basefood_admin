import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import AddProcessLevel from "./crude/AddProcessLevel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCrops } from "../../redux/reducers/crops/cropSlice";
import { FetchProcessLevel } from "../../redux/reducers/processLevel/processLevelSlice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FetchVarieties } from "../../redux/reducers/variety/varietySlice";
import CustomPagination from "../common/pagination/CustomPagination";

const ProcessLevelComponent = () => {
  const dispatch = useAppDispatch();
  const [addProcessLevelModal, setAddProcessLevelModal] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState("");
  const [selectedVarietyId, setSelectedVarietyId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const { cropList } = useAppSelector((state) => state.crops);
  const { data: processStates } = useAppSelector((state) => state.processLevel);
  const { data: varieties } = useAppSelector((state) => state.viriety);

  useEffect(() => {
    dispatch(getCrops());
    dispatch(FetchProcessLevel());
    dispatch(FetchVarieties());
  }, [dispatch]);

  // Filter varieties based on selected crop
  const filteredVarieties = Array.isArray(varieties)
    ? varieties.filter(
        (variety: any) => variety.crop_id === Number(selectedCropId),
      )
    : [];

  // Filter process states based on selected variety
  const filteredProcessStates = Array.isArray(processStates)
    ? processStates.filter(
        (state: any) => state.crop_variety_id === Number(selectedVarietyId),
      )
    : [];

  const toggleAddProcessLevel = () => {
    setAddProcessLevelModal(!addProcessLevelModal);
  };

  // Paginate filteredProcessStates
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentProcessStates = filteredProcessStates.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-medium ">Process state</h1>
            <div className="flex items-center gap-2">
              {/* Crop dropdown */}
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="crop-select-label">Select a crop</InputLabel>
                <Select
                  labelId="crop-select-label"
                  value={selectedCropId}
                  onChange={(e) => {
                    setSelectedCropId(e.target.value);
                    setSelectedVarietyId("");
                  }}
                >
                  {Array.isArray(cropList) && cropList?.length === 0 ? (
                    <MenuItem>No crop found</MenuItem>
                  ) : (
                    Array.isArray(cropList) &&
                    cropList?.map((crop: any) => (
                      <MenuItem value={crop.id} key={crop.id}>
                        {crop.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              {/* Variety dropdown */}
              {selectedCropId && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="variety-select-label">
                    Select Variety
                  </InputLabel>
                  <Select
                    labelId="variety-select-label"
                    value={selectedVarietyId}
                    onChange={(e) => setSelectedVarietyId(e.target.value)}
                  >
                    {Array.isArray(filteredVarieties) &&
                    filteredVarieties?.length === 0 ? (
                      <MenuItem>No variety found</MenuItem>
                    ) : (
                      filteredVarieties?.map((variet: any) => (
                        <MenuItem value={variet.id} key={variet.id}>
                          {variet.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              )}
            </div>
          </div>
          <button
            className="bg-brand-blue px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleAddProcessLevel}
          >
            <MdAddCircle className="text-2xl" />
            Add process
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
              <tr>
                <th className="p-3 font-normal rounded-l-md">Process State</th>
                <th className="p-3 font-normal rounded-r-md expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {selectedCropId === "" ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    Please select a crop
                  </td>
                </tr>
              ) : selectedVarietyId === "" ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    Please select a variety
                  </td>
                </tr>
              ) : currentProcessStates.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No process states found for the selected variety
                  </td>
                </tr>
              ) : (
                currentProcessStates.map((state: any, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2 border-b dark:border-white/20">
                      {state.process_state}
                    </td>
                    <td className="px-2 py-4 space-x-2 flex items-center gap-1 border-b dark:border-white/20">
                      <Link
                        to={`/process/${state.crop_variety_id}`}
                        state={state}
                      >
                        <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                          <FaEye className="text-lg" />
                        </button>
                      </Link>
                      <div>
                        <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {selectedVarietyId && (
          <CustomPagination
            currentPage={currentPage}
            totalItems={filteredProcessStates.length}
            itemsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(items) => {
              setRowsPerPage(items);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
      {addProcessLevelModal && (
        <AddProcessLevel toggleAddProcessLevel={toggleAddProcessLevel} />
      )}
    </div>
  );
};

export default ProcessLevelComponent;
