import React from "react";

interface CsvPreviewTableProps {
  csvData: string[][];
}

const CsvPreviewTable: React.FC<CsvPreviewTableProps> = ({ csvData }) => {
  if (!csvData || csvData.length === 0) return null;

  const headers = csvData[0];
  const rows = csvData.slice(1);

  return (
    <div className="mt-4 overflow-auto max-h-[65vh]">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-[#444444]">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 dark:border-gray-600 p-2 font-normal text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-gray-50 dark:odd:bg-[#333333] dark:even:bg-[#444444]"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 dark:border-gray-600 p-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvPreviewTable;
