/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddCropCategory from "./crude/AddCropCategory";
import { getCropsCategory } from "../../redux/reducers/crops/cropCategorySlice";
import TablePagination from "../common/TablePagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CropCategoriesComponent = () => {
  const [addCropCategoryModal, setAddCropCategoryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useAppDispatch();
  const { cropCategoryList, isLoading, error } = useAppSelector(
    (state) => state.cropCategory,
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset to first page on items per page change
  };

  const toggleCropCategoryModal = () => {
    setAddCropCategoryModal(!addCropCategoryModal);
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        await dispatch(getCropsCategory()).unwrap();
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };

    fetchCrops();
  }, [dispatch]);

  const indexOfLastCategory = page * rowsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
  const currentCategories = cropCategoryList?.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2 mb-4">
          <h1 className="text-2xl font-bold">Crop Categories</h1>
          <button
            className="bg-blue-500 px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCropCategoryModal}
          >
            <MdAddCircle className="text-2xl" />
            Add Category
          </button>
        </div>

        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 rounded-l-lg">No</th>
                <th className="p-3">Crop Name</th>
                <th className="p-3 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {currentCategories?.map((crop: any, idx) => (
                <tr key={crop.id} className="border-b dark:border-white/20">
                  <td className="px-5">{idx + 1 + indexOfFirstCategory}</td>
                  <td className="px-3">{crop.name}</td>
                  <td className="px-2 py-4 flex items-center gap-1">
                    <Link to={`/crop/${crop.id}`} state={crop}>
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

        {/* Pagination */}
        <TablePagination
          totalItems={cropCategoryList.length}
          currentPage={page}
          handlePageChange={handleChangePage}
          itemsPerPage={rowsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          isDarkMode={theme === "dark"}
        />
      </div>

      {addCropCategoryModal && (
        <AddCropCategory toggleAddCropCategory={toggleCropCategoryModal} />
      )}
    </div>
  );
};

export default CropCategoriesComponent;
