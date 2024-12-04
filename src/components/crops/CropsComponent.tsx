import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCropsCategory } from "../../redux/reducers/crops/cropCategorySlice";
import { getCrops } from "../../redux/reducers/crops/cropSlice";
import CustomPagination from "../common/pagination/CustomPagination";
import AddCrop from "./crude/AddCrop";

const CropsComponent = () => {
  const dispatch = useAppDispatch();
  const { cropList, isLoading } = useAppSelector((state) => state.crops);
  const { cropCategoryList } = useAppSelector((state) => state.cropCategory);

  const [addCropModal, setAddCropModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getCrops());
    dispatch(getCropsCategory());
  }, [dispatch]);

  useEffect(() => {
    if (cropCategoryList.length > 0 && selectedCategory === null) {
      setSelectedCategory(cropCategoryList[0].id);
    }
  }, [cropCategoryList, selectedCategory]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryId = event.target.value ? parseInt(event.target.value) : null;
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const toggleCropModal = () => {
    setAddCropModal(!addCropModal);
  };

  const filteredCrops = selectedCategory
    ? cropList.filter((crop: any) => crop.crop_category === selectedCategory)
    : cropList;

  const totalItems = filteredCrops.length;
  const indexOfLastCrop = currentPage * itemsPerPage;
  const indexOfFirstCrop = Math.max(indexOfLastCrop - itemsPerPage, 0);
  const currentCrops = filteredCrops.slice(indexOfFirstCrop, indexOfLastCrop);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold italic">Crops</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="crop-category-select-label">
                Select a category
              </InputLabel>
              <Select
                labelId="crop-category-select-label"
                value={selectedCategory ? selectedCategory.toString() : ""}
                onChange={handleCategoryChange}
                label="Select a category"
                size="small"
              >
                {cropCategoryList.length === 0 ? (
                  <MenuItem>No categories found</MenuItem>
                ) : (
                  cropCategoryList.map((category: any) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>
          <button
            className="bg-brand-blue px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCropModal}
          >
            <MdAddCircle className="text-2xl" />
            Add crop
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
              <tr>
                <th className="p-3 font-normal rounded-l-md">Crop name</th>
                <th className="p-3 font-normal rounded-r-md expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {isLoading ? (
                [...Array(itemsPerPage)].map((_, idx) => (
                  <tr key={idx}>
                    <td className="p-3">
                      <Skeleton height={20} width={100} />
                    </td>
                    <td className="p-3">
                      <Skeleton circle width={30} height={30} />
                    </td>
                  </tr>
                ))
              ) : currentCrops.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-lg">
                    No crops available
                  </td>
                </tr>
              ) : (
                currentCrops.map((crop) => (
                  <tr key={crop.id}>
                    <td className="px-3">{crop.name}</td>
                    <td className="px-2 py-4 space-x-2 flex items-center gap-1">
                      <Link to={`/crop/${crop.id}`} state={crop}>
                        <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                          <FaEye className="text-lg" />
                        </button>
                      </Link>
                      <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalItems > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

      {addCropModal && <AddCrop toggleAddCrop={toggleCropModal} />}
    </div>
  );
};

export default CropsComponent;
