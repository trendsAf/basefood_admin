import React from "react";
import Pagination from "@mui/material/Pagination";
import { MenuItem, TextField } from "@mui/material";

interface PaginationComponentProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  isDarkMode: boolean;
  handlePageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => void;
}

const TablePagination: React.FC<PaginationComponentProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  isDarkMode,
  handlePageChange,
  handleItemsPerPageChange,
}) => {
  const menuItems = [5, 10, 15, 20];
  const commonStyles = {
    select: {
      height: "36px",
      fontSize: "14px",
      // width: "80px",
    },
    menuItem: {
      fontSize: "14px",
      padding: "6px 4px",
      minHeight: "32px",
    },
  };
  return (
    <div className="flex items-center  justify-between  py-3 flex-col md:flex-row">
      <div className="flex items-center gap-1 ">
        <label className="dark:text-white">Show Results: </label>
        <TextField
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          size="small"
          select
          sx={{
            "& .MuiInputBase-root": {
              color: isDarkMode ? "white" : "initial",
              height: commonStyles.select.height,
              padding: "0 8px",
            },
            "& .MuiSelect-select": {
              padding: "4px 4px",
              fontSize: commonStyles.select.fontSize,
            },
            "& .MuiSvgIcon-root": {
              color: isDarkMode ? "white" : "initial",
              fontSize: "20px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? "white" : "initial",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? "white" : "initial",
            },
            // width: commonStyles.select.width,
          }}
        >
          {menuItems.map((value) => (
            <MenuItem key={value} value={value} sx={commonStyles.menuItem}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex items-center justify-center ">
        <Pagination
          size="small"
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: isDarkMode ? "white" : "initial",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "white",
              backgroundColor: "#1456F5",
              "&:hover": {
                backgroundColor: "#1456F5",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TablePagination;
