import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCrops } from "../../redux/reducers/crops/cropSlice";
import { FetchVarieties } from "../../redux/reducers/variety/varietySlice";
import CustomPagination from "../common/pagination/CustomPagination";
import AddVariety from "./crude/AddVariety";

const VarietyComponent = () => {
  const dispatch = useAppDispatch();
  const [addVarietyModal, setAddVarietyModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  const { cropList } = useAppSelector((state) => state.crops);

  const {
    data: varieties,
    isLoading,
    error,
  } = useAppSelector((state) => state.viriety);

  useEffect(() => {
    dispatch(FetchVarieties());
    dispatch(getCrops());
  }, [dispatch]);

  useEffect(() => {
    if (cropList.length > 0) {
      setSelectedCrop((prev) => prev ?? cropList[0].id);
    }
  }, [cropList]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const crop_id = event.target.value ? parseInt(event.target.value) : null;
    setSelectedCrop(crop_id);
    setPage(1);
  };

  const filteredVarieties = Array.isArray(varieties)
    ? varieties.filter((variety: any) => variety.crop_id === selectedCrop)
    : [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setRowsPerPage(itemsPerPage);
    setPage(1);
  };

  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentVarieties = Array.isArray(filteredVarieties)
    ? filteredVarieties.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-medium ">Crop varieties</h1>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Variety
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                onChange={handleCategoryChange}
                label="Variety"
                value={selectedCrop ? selectedCrop.toString() : ""}
              >
                {Array.isArray(cropList) && cropList.length > 0 ? (
                  cropList.map((variet: any) => (
                    <MenuItem value={variet.id} key={variet.id}>
                      {variet.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No crops available</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <button
            className="bg-brand-blue px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={() => setAddVarietyModal(!addVarietyModal)}
          >
            <MdAddCircle className="text-2xl" />
            Add Variety
          </button>
        </div>

        {isLoading ? (
          [...Array(rowsPerPage)].map((_, idx) => (
            <tr key={idx}>
              <td className="p-3">
                <Skeleton height={20} width={100} />
              </td>
              <td className="p-3">
                <Skeleton circle width={30} height={30} />
              </td>
            </tr>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
              <thead className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-3 font-normal rounded-l-md">Variety Name</th>
                  <th className="p-3 font-normal rounded-r-md expand">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {currentVarieties.map((variety: any) => (
                  <tr key={variety.id}>
                    <td className="px-3 border-b dark:border-white/20">
                      {variety.name}
                    </td>
                    <td className="px-2 py-2 flex items-center gap-1 border-b dark:border-white/20">
                      <Link to={`/variety/${variety.id}`} state={variety}>
                        <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                          <FaEye className="text-lg" />
                        </button>
                      </Link>
                      <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <CustomPagination
          totalItems={filteredVarieties?.length || 0}
          currentPage={page}
          onPageChange={handlePageChange}
          itemsPerPage={rowsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {addVarietyModal && (
        <AddVariety
          toggleAddVariety={() => setAddVarietyModal(!addVarietyModal)}
        />
      )}
    </div>
  );
};

export default VarietyComponent;
