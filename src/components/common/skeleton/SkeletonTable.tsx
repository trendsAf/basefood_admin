import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonTableProps {
  rows: number; // Number of rows to show in the skeleton
  columns: number; // Number of columns
  columnWidths?: number[]; // Optional column widths for customization
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows,
  columns,
  columnWidths = [],
}) => {
  // Render a skeleton for each row and each column
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0 p-2">
        <thead className="text-base bg-bg-gray dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
          <tr>
            {Array.from({ length: columns }, (_, idx) => (
              <th key={idx} className="px-3 py-2">
                <Skeleton width={columnWidths[idx] || 100} height={20} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700 dark:text-gray-300">
          {Array.from({ length: rows }, (_, rowIdx) => (
            <tr
              key={rowIdx}
              className="!border-b my-1 gap-1 !dark:border-gray-600"
            >
              {Array.from({ length: columns }, (_, colIdx) => (
                <td
                  key={colIdx}
                  className="px-3 py-2 border-b-[0.5px] dark:border-gray-600"
                >
                  <Skeleton width={columnWidths[colIdx] || 150} height={20} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
