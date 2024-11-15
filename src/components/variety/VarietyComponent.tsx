// VarietyComponent.tsx
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

import { MdAddCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { countryRegions } from "../../utils/countriesData";
import TablePagination from "../common/TablePagination";
import AddVariety from "./crude/AddVariety";

const VarietyComponent = () => {
  const [addVarietyModal, setAddVarietyModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useSelector((state: RootState) => state.theme.value);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  const indexOfLastRegion = page * rowsPerPage;
  const indexOfFirstRegion = indexOfLastRegion - rowsPerPage;
  const currentRegion = Array.isArray(countryRegions)
    ? countryRegions.slice(indexOfFirstRegion, indexOfLastRegion)
    : [];

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        {/* Header and Button */}
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-bold mb-4">Varieties</h1>
          <button
            className="bg-blue-500 px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={() => setAddVarietyModal(!addVarietyModal)}
          >
            <MdAddCircle className="text-2xl" />
            Add variety
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 rounded-l-lg">No</th>
                <th className="p-3">Variety name</th>
                <th className="p-3">Crop</th>
                <th className="p-3 rounded-r-lg expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {currentRegion?.map((region: any, idx: number) => (
                <tr key={idx} className="">
                  <td className="px-5 border-b dark:border-white/20">
                    {idx + 1 + page * rowsPerPage}
                  </td>
                  <td className="px-3 border-b dark:border-white/20">
                    {/* {region.name} */} Yellow maize
                  </td>
                  <td className="px-5 py-2 border-b dark:border-white/20">
                    {/* {region.region} */} Maize
                  </td>
                  <td className="px-2 py-4 flex items-center gap-1 border-b dark:border-white/20">
                    <Link to={`/region/${region.id}`} state={region}>
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
          totalItems={countryRegions.length}
          currentPage={page}
          handlePageChange={handleChangePage}
          itemsPerPage={rowsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          isDarkMode={theme === "dark"}
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
