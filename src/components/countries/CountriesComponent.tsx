import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuView } from "react-icons/lu";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { countries } from "../../utils/countriesData";
import AddCountry from "./crude/AddCountries";
import TablePagination from "@mui/material/TablePagination";

const ProducerProductComponent = () => {
  const [addCountryModal, setAddCountryModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleCountryModal = () => {
    setAddCountryModal(!addCountryModal);
  };

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-bold mb-4">Countries</h1>
          <button
            className="bg-blue-500 px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCountryModal}
          >
            <MdAddCircle className="text-2xl" />
            Add country
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
              <tr>
                <th className="p-3 rounded-l-lg">No</th>
                <th className="p-3">Country name</th>
                <th className="p-3">Country flag</th>
                <th className="p-3 rounded-r-lg expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {countries
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((country: any, idx) => (
                  <tr key={idx} className="">
                    <td
                      className={`px-5  ${idx === countries.length - 1 ? "border-none" : "border-b dark:border-white/20"}`}
                    >
                      {idx + 1 + page * rowsPerPage}
                    </td>
                    <td
                      className={`px-3  ${idx === countries.length - 1 ? "border-none" : "border-b dark:border-white/20"}`}
                    >
                      {country.name}
                    </td>
                    <td
                      className={`px-5 py-2  ${idx === countries.length - 1 ? "border-none" : "border-b dark:border-white/20"}`}
                    >
                      <img src={country.code} alt={`${country.name} flag`} />
                    </td>
                    <td
                      className={`px-2 py-4 space-x-2 flex items-center gap-1 ${idx === countries.length - 1 ? "border-none" : "border-b dark:border-white/20 "}`}
                    >
                      <Link to={`/country/${country.id}`} state={country}>
                        <button className="px-1 py-1 text-blue-500 rounded text-2xl">
                          <LuView />
                        </button>
                      </Link>
                      <div>
                        <BsThreeDotsVertical className="text-2xl cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <TablePagination
          component="div"
          count={countries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 8, 10, 15]}
        />
      </div>
      {addCountryModal && <AddCountry toggleAddCountry={toggleCountryModal} />}
    </div>
  );
};

export default ProducerProductComponent;
