import React, { useState } from "react";
// import ToggleSwitch from '../ToggleSwitch';
import Pagination from "./Pagination";
import ToggleSwitch from "./ToggleSwitch";
// import Pagination from '../tables/Pagination';

const Table: React.FC = () => {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      image:
        "https://i0.wp.com/foodieng.com/wp-content/uploads/2022/05/yellow-maiz.jpg?fit=1000%2C867&ssl=1",
      name: "Yellow Maize",
      type: "Cereal",
      country: "United States",
      region: "Midwest",
      cropVariety: "Pioneer P1197",
      totalOrder: 1234,
      price: "$180.50/ton",
      active: true,
    },
    {
      id: 2,
      image:
        "https://www.foodandwine.com/thmb/XbKXqQvF61Csj9XLs_Nj3xwlwEI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Everything-You-Need-To-Know-About-Arabica-Coffee-FT-BLOG0822-2000-127d1551916e45138ea373de75f08138.jpg",
      name: "Arabica Coffee",
      type: "Coffee",
      country: "Brazil",
      region: "Minas Gerais",
      cropVariety: "Bourbon",
      totalOrder: 2184,
      price: "$4.20/lb",
      active: true,
    },
    {
      id: 3,
      image:
        "https://www.fieldstoneorganics.ca/wp-content/uploads/2022/04/Hard-Red-Winter-Wheat.jpg",
      name: "Hard Red Wheat",
      type: "Cereal",
      country: "Canada",
      region: "Saskatchewan",
      cropVariety: "Red Fife",
      totalOrder: 1255,
      price: "$280.00/ton",
      active: true,
    },
    {
      id: 4,
      image: "https://www.scoular.com/wp-content/uploads/2020/10/soy-beans.jpg",
      name: "Soybeans",
      type: "Legume",
      country: "Argentina",
      region: "Pampas",
      cropVariety: "DM 4670",
      totalOrder: 921,
      price: "$520.00/ton",
      active: false,
    },
    {
      id: 5,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/4/303834484/WA/YW/BS/59043273/basmati-rice.webp",
      name: "Basmati Rice",
      type: "Rice",
      country: "India",
      region: "Punjab",
      cropVariety: "Pusa-1121",
      totalOrder: 1522,
      price: "$1200.00/ton",
      active: true,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleToggle = (id: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, active: !stock.active } : stock,
      ),
    );
  };

  return (
    <div className="">
      <div className="table-container overflow-x-scroll">
        <table className="min-w-full bg-white dark:bg-secondary-black border-collapse">
          <thead>
            <tr className="px-3 bg-light-blue dark:bg-[#404040] rounded-lg">
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Crop
              </th>
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Country
              </th>
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Region
              </th>
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Variety
              </th>
              {/* <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white whitespace-nowrap">
                Total Order
              </th> */}
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Price
              </th>
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white">
                Type
              </th>
              <th className="py-2 text-md font-medium px-2 text-left dark:bg-[#404040] text-black dark:text-white rounded-r-[12px]">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="px-2">
                <td className="py-3 px-4 flex items-center gap-2 min-w-[200px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-md mr-2"
                  />
                  <span className="text-dark-gray dark:text-white">
                    {item.name}
                  </span>
                </td>
                <td className="py-3 px-4 text-dark-gray dark:text-white">
                  {item.country}
                </td>
                <td className="py-3 px-4 text-dark-gray dark:text-white">
                  {item.region}
                </td>
                <td className="py-3 px-4 text-dark-gray dark:text-white">
                  {item.cropVariety}
                </td>
                {/* <td className="py-3 px-4 text-dark-gray dark:text-white whitespace-nowrap">
                  {item.totalOrder.toLocaleString()}
                </td> */}
                <td className="py-3 px-4 text-dark-gray dark:text-white">
                  {item.price}
                </td>
                <td className="py-3 px-4 text-dark-gray dark:text-white">
                  <span className="bg-light-blue dark:bg-[#232D45] dark:text-brand-blue text-brand-blue px-2 rounded py-1">
                    {item.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <ToggleSwitch
                    checked={item.active}
                    onChange={() => handleToggle(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={stocks.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default Table;
