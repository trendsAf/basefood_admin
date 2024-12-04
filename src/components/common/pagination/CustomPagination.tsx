import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CustomPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationRange = () => {
    const range: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1, 2);
      if (currentPage > 2 && currentPage < totalPages - 1) {
        range.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        range.push("...");
      }
      range.push(totalPages - 1, totalPages);
    }

    return Array.from(new Set(range));
  };

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
          className="bg-transparent border border-gray-300 dark:border-gray-600 text-center bg-[#F7F8FA] focus:outline-none dark:bg-[#404040] text-dark-gray dark:text-white px-2 py-1 rounded-lg hover:ring-2 hover:ring-blue-500 transition-all"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div className="flex items-center py-4 space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg transition-all ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* Pagination Range */}
        {getPaginationRange().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-2 rounded-lg transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white font-normal dark:bg-blue-800 dark:text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
