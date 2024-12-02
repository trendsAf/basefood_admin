import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import AddProcessLevel from "./crude/AddProcessLevel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCrops } from "../../redux/reducers/crops/cropSlice";
import { FetchProcessLevel } from "../../redux/reducers/processLevel/processLevelSlice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FetchVarieties } from "../../redux/reducers/variety/varietySlice";

const ProcessLevelComponent = () => {
  const dispatch = useAppDispatch();
  const [addProcessLevelModal, setAddProcessLevelModal] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState("");
  const [selectedVarietyId, setSelectedVarietyId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddProcessLevel = () => {
    setAddProcessLevelModal(!addProcessLevelModal);
  };

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Process state</h1>
            <div className="flex items-center gap-2">
              {/* Crop dropdown */}
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select a crop
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Crop"
                  value={selectedCropId}
                  onChange={(e) => {
                    setSelectedCropId(e.target.value);
                    setSelectedVarietyId("");
                  }}
                >
                  {Array.isArray(cropList) && cropList?.length === 0 ? (
                    <MenuItem>No crop found</MenuItem>
                  ) : (
                    cropList?.map((crop: any) => (
                      <MenuItem value={crop.id} key={crop.id}>
                        {crop.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              {/* Variety dropdown */}
              {selectedCropId ? (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Variety
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={selectedVarietyId}
                    label="Variety"
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
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            className="bg-blue-500 px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleAddProcessLevel}
          >
            <MdAddCircle className="text-2xl" />
            Add process
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
              <tr>
                <th className="p-3">Process State</th>
                <th className="p-3 rounded-r-lg expand">Action</th>
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
              ) : filteredProcessStates.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No process states found for the selected variety
                  </td>
                </tr>
              ) : (
                filteredProcessStates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((state: any, idx) => (
                    <tr key={idx} className="">
                      <td
                        className={`px-3 py-2 ${
                          idx === filteredProcessStates.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20"
                        }`}
                      >
                        {state.process_state}
                      </td>
                      <td
                        className={`px-2 py-4 space-x-2 flex items-center gap-1 ${
                          idx === filteredProcessStates.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20 "
                        }`}
                      >
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
          <TablePagination
            component="div"
            count={filteredProcessStates.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 8, 10, 15]}
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
