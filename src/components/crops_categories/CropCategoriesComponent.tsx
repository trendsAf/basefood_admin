import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

import { MdAddCircle } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCropsCategory } from "../../redux/reducers/crops/cropCategorySlice";
import CustomPagination from "../common/pagination/CustomPagination";
import AddCropCategory from "./crude/AddCropCategory";

const CropCategoriesComponent = () => {
  const [addCropCategoryModal, setAddCropCategoryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const dispatch = useAppDispatch();
  const { cropCategoryList, isLoading, error } = useAppSelector(
    (state) => state.cropCategory,
  );

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setRowsPerPage(itemsPerPage);
    setPage(1);
  };

  const toggleCropCategoryModal = () => {
    setAddCropCategoryModal(!addCropCategoryModal);
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        await dispatch(getCropsCategory()).unwrap();
      } catch (err: any) {
        toast.error(err.message);
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
        <div className="flex items-center justify-between px-3 mb-1">
          <h1 className="text-2xl font-medium ">Crop Categories</h1>
          <button
            className="bg-brand-blue px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCropCategoryModal}
          >
            <MdAddCircle className="text-2xl" />
            Add Category
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 rounded-l-md font-normal">Crop Name</th>
                <th className="p-3 rounded-r-md font-normal expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {isLoading ? (
                [...Array(rowsPerPage)].map((_, idx) => (
                  <tr key={idx}>
                    <td className="p-3">
                      <Skeleton height={20} width={50} />
                    </td>
                    <td className="p-3">
                      <Skeleton height={20} width={200} />
                    </td>
                    <td className="p-3">
                      <Skeleton circle width={30} height={30} />
                    </td>
                  </tr>
                ))
              ) : Array.isArray(currentCategories) &&
                currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No category available
                  </td>
                </tr>
              ) : Array.isArray(currentCategories) ? (
                currentCategories.map((crop) => (
                  <tr key={crop.id} className="border-b dark:border-white/20">
                    <td className="px-3 border-b dark:border-white/20">
                      {crop.name}
                    </td>
                    <td className="px-2 border-b dark:border-white/20 py-2 flex items-center gap-1">
                      <Link to={`/crop/${crop.id}`} state={crop}>
                        <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                          <FaEye className="text-lg" />
                        </button>
                      </Link>
                      <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                // Handle unexpected scenarios
                <tr>
                  <td colSpan={2} className="text-center py-4 text-red-500">
                    An error occurred while fetching categories.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <CustomPagination
          totalItems={cropCategoryList.length}
          currentPage={page}
          onPageChange={handleChangePage}
          itemsPerPage={rowsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {addCropCategoryModal && (
        <AddCropCategory toggleAddCropCategory={toggleCropCategoryModal} />
      )}
      <ToastContainer />
    </div>
  );
};

export default CropCategoriesComponent;
