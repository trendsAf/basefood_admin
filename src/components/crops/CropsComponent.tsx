import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCrops } from "../../redux/reducers/crops/cropSlice";
import AddCrop from "./crude/AddCrop";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TablePagination from "../common/TablePagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CropsComponent = () => {
  const dispatch = useAppDispatch();
  const { cropList, isLoading } = useAppSelector((state) => state.getCrops);
  const [addCropModal, setAddCropModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const theme = useSelector((state: RootState) => state.theme.value);

  // Dispatch the action to fetch crops
  useEffect(() => {
    dispatch(getCrops());
  }, [dispatch]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  // Toggle crop modal
  const toggleCropModal = () => {
    setAddCropModal(!addCropModal);
  };

  // Pagination slicing
  const indexOfLastCrop = page * rowsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - rowsPerPage;
  const currentCrops = cropList?.slice(indexOfFirstCrop, indexOfLastCrop);

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-bold mb-4">Crops</h1>
          <button
            className="bg-blue-500 px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCropModal}
          >
            <MdAddCircle className="text-2xl" />
            Add crop
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
              <tr>
                <th className="p-3 rounded-l-lg">No</th>
                <th className="p-3">Crop name</th>
                <th className="p-3">Crop category</th>
                <th className="p-3 rounded-r-lg expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {isLoading
                ? // Skeleton loading rows while data is being fetched
                  [...Array(rowsPerPage)].map((_, idx) => (
                    <tr key={idx}>
                      <td className="p-3">
                        <Skeleton height={20} width={50} />
                      </td>
                      <td className="p-3">
                        <Skeleton height={20} width={150} />
                      </td>
                      <td className="p-3">
                        <Skeleton height={20} width={100} />
                      </td>
                      <td className="p-3">
                        <Skeleton circle width={30} height={30} />
                      </td>
                    </tr>
                  ))
                : currentCrops?.map((crop: any, idx) => (
                    <tr key={crop.id}>
                      <td
                        className={`px-5 ${
                          idx === currentCrops.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20"
                        }`}
                      >
                        {idx + 1 + page * rowsPerPage}
                      </td>
                      <td
                        className={`px-3 ${
                          idx === currentCrops.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20"
                        }`}
                      >
                        {crop.name}
                      </td>
                      <td
                        className={`px-5 py-2 ${
                          idx === currentCrops.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20"
                        }`}
                      >
                        {crop.category || "Unknown Category"}
                      </td>
                      <td
                        className={`px-2 py-4 space-x-2 flex items-center gap-1 ${
                          idx === currentCrops.length - 1
                            ? "border-none"
                            : "border-b dark:border-white/20"
                        }`}
                      >
                        <Link to={`/crop/${crop.id}`} state={crop}>
                          <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                            <FaEye />
                          </button>
                        </Link>
                        <div>
                          <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination
          totalItems={cropList.length}
          currentPage={page}
          handlePageChange={handleChangePage}
          itemsPerPage={rowsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          isDarkMode={theme === "dark"}
        />
      </div>

      {addCropModal && <AddCrop toggleAddCrop={toggleCropModal} />}
    </div>
  );
};

export default CropsComponent;
