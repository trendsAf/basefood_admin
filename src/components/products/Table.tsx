import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import CustomPagination from "../common/pagination/CustomPagination";
import ToggleSwitch from "./ToggleSwitch";
import { productsData } from "../../utils/products/productsData";
import { productTableHeader } from "../../utils/tables/tableUtils";

const Table: React.FC = () => {
  const [products, setProducts] = useState(productsData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleToggle = (id: number) => {
    setProducts((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, active: !stock.active } : stock,
      ),
    );
  };

  return (
    <div className="">
      <div className="table-container">
        <table className="min-w-full bg-white dark:bg-secondary-black border-collapse text-left">
          <thead>
            <tr className="">
              {productTableHeader.map((header, idx) => (
                <th
                  key={idx}
                  className={`py-2 text-md font-normal px-2 text-left dark:bg-[#1f2937] text-black dark:text-gray-300 ${idx === 0 ? " rounded-l-md" : ""} ${idx === productTableHeader.length - 1 ? "rounded-r-md" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr
                key={idx}
                className={`px-2  dark:border-gray-300 ${idx === currentItems.length - 1 ? "border-b-0" : "border-b-[0.5px]"}`}
              >
                <td className="py-2 px-4 flex items-center gap-2 min-w-[200px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-md mr-2"
                  />
                  <span className="text-dark-gray dark:text-gray-300">
                    {item.name}
                  </span>
                </td>
                <td className="py-3 px-2 text-dark-gray dark:text-gray-300">
                  {item.country}
                </td>
                <td className="py-3 px-2 text-dark-gray dark:text-gray-300">
                  {item.region}
                </td>
                <td className="py-3 px-2 text-dark-gray dark:text-gray-300">
                  {item.cropVariety}
                </td>
                <td className="py-3 px-2 text-dark-gray dark:text-gray-300">
                  {item.price}
                </td>
                <td className="py-3 px-2">
                  <ToggleSwitch
                    checked={item.active}
                    onChange={() => handleToggle(item.id)}
                  />
                </td>
                <td className="px-2 py-2 gap-1 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <BsThreeDotsVertical className="text-lg cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default Table;
