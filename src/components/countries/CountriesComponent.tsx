/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchCountries } from "../../redux/reducers/countries/countrySlice";
import { RootState } from "../../redux/store";
import TablePagination from "../common/TablePagination";
import AddCountry from "./crude/AddCountries";

const ProducerProductComponent = () => {
  const [addCountryModal, setAddCountryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useAppDispatch();

  const {
    data: countries,
    isLoading,
    error,
  } = useAppSelector((state) => state.countries);

  useEffect(() => {
    dispatch(FetchCountries());
  }, [dispatch]);

  console.log(countries, "Coutrrrrrrr");
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChangeTransfers = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  const toggleCountryModal = () => {
    setAddCountryModal(!addCountryModal);
  };

  const indexOfLastCountry = page * rowsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - rowsPerPage;
  const currentCountry = Array.isArray(countries)
    ? countries.slice(indexOfFirstCountry, indexOfLastCountry)
    : [];

  return (
    <div className="dark:text-white py-4">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-2 mb-4">
          <h1 className="text-2xl font-bold">Countries</h1>
          <button
            className="bg-brand-blue px-6 py-1 flex items-center gap-1 text-xl rounded text-white"
            onClick={toggleCountryModal}
          >
            <MdAddCircle className="text-xl" />
            Add Country
          </button>
        </div>

        {isLoading ? (
          <p>Loading countries...</p>
        ) : error ? (
          <p>Error loading countries: {error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0 p-2">
              <thead className="text-base bg-bg-gray dark:bg-gray-700 text-gray-700 dark:text-gray-300 overflow-hidden">
                <tr>
                  <th className="px-3 py-2 rounded-l-lg">Country</th>
                  <th className="px-3 py-2 rounded-r-lg expand">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {currentCountry?.map((country: any, idx) => (
                  <tr
                    key={idx}
                    className="!border-b my-1 gap-1 !dark:border-gray-600"
                  >
                    <td className="px-3 border-b-[0.5px] dark:border-gray-600">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://flagsapi.com/${country.code}/flat/64.png`}
                          alt={`${country.name} flag`}
                          className="w-10"
                        />
                        {country.name}
                      </div>
                    </td>
                    <td className="px-2 py-2 gap-1 border-b-[0.5px] dark:border-gray-600">
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
        )}

        <TablePagination
          isDarkMode={theme === "dark"}
          totalItems={countries.length}
          currentPage={page}
          handlePageChange={handleChangePage}
          itemsPerPage={rowsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChangeTransfers}
        />
      </div>
      {addCountryModal && <AddCountry toggleAddCountry={toggleCountryModal} />}
    </div>
  );
};

export default ProducerProductComponent;
