import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchCountries } from "../../redux/reducers/countries/countrySlice";
import { getRegions } from "../../redux/reducers/regions/regionSlice";
import CustomPagination from "../common/pagination/CustomPagination";
import AddRegion from "./crude/AddRegion";

const RegionComponent = () => {
  const [addCountryModal, setAddCountryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);

  const { regionList, isLoading } = useAppSelector((state) => state.regions);
  const { data } = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedCountry(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(getRegions());
    }
  }, [selectedCountry, dispatch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setRowsPerPage(itemsPerPage);
    setPage(1);
  };

  // Filter regions based on selected country
  const filteredRegionList = Array.isArray(regionList)
    ? regionList.filter((region: any) => region.country_id === selectedCountry)
    : [];

  const indexOfLastRegion = page * rowsPerPage;
  const indexOfFirstRegion = indexOfLastRegion - rowsPerPage;
  const currentRegion = filteredRegionList.slice(
    indexOfFirstRegion,
    indexOfLastRegion,
  );

  return (
    <div className="dark:text-white p-6">
      <div className="dark:bg-[#252525] bg-white px-5 pt-5 rounded">
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold italic">Regions</h1>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select country
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedCountry ? selectedCountry : " "}
                label="country"
                onChange={(e) => setSelectedCountry(Number(e.target.value))}
              >
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((variet: any) => (
                    <MenuItem value={variet.id} key={variet.id}>
                      {variet.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No countries available</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <button
            className="bg-brand-blue px-6 py-2 flex items-center gap-1 text-xl rounded text-white"
            onClick={() => setAddCountryModal(!addCountryModal)}
          >
            <MdAddCircle className="text-2xl" />
            Add region
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-[#252525] border-separate border-spacing-0 p-2">
            <thead className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ">
              <tr className="">
                <th className="p-3 font-normal rounded-l-lg">Regions</th>
                <th className="p-3 font-normal rounded-r-lg expand">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {isLoading ? (
                [...Array(rowsPerPage)].map((_, idx) => (
                  <tr key={idx}>
                    <td className="p-3">
                      <Skeleton height={20} width={100} />
                    </td>
                    <td className="p-3">
                      <Skeleton circle width={30} height={30} />
                    </td>
                  </tr>
                ))
              ) : currentRegion.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No regions found for this country.
                  </td>
                </tr>
              ) : (
                currentRegion?.map((region: any, idx: number) => (
                  <tr key={idx} className="">
                    <td className="px-3 border-b dark:border-white/20">
                      {region.region_name}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <CustomPagination
          totalItems={filteredRegionList.length}
          currentPage={page}
          onPageChange={handlePageChange}
          itemsPerPage={rowsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {addCountryModal && (
        <AddRegion
          toggleAddRegion={() => setAddCountryModal(!addCountryModal)}
        />
      )}
    </div>
  );
};

export default RegionComponent;
