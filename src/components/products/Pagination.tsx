import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between flex-col md:flex-row items-center mt-4">
      <div className="flex items-center">
        <label
          htmlFor="itemsPerPage"
          className="mr-2 text-dark-gray dark:text-white"
        >
          Show result:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className=" bg-transparent border-none text-center bg-[#F7F8FA] focus:outline-none dark:bg-[#404040] text-dark-gray dark:text-white px-2 py-1 rounded-lg"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="flex items-center py-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 rounded-lg bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-lg ${currentPage === index + 1 ? "bg-brand-blue dark:bg-[#404040] text-white" : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 rounded-lg bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
