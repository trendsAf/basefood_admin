// import Layout from "../components/Layout";
// import CustomSelect from "../components/stocks/CustomSelect";
// import CustomSelect from "../components/products/CustomSelect";
// import Table from "../components/stocks/Table";
import { Link } from "react-router-dom";
import Table from "../../components/products/Table";
import CustomSelect from "../../components/products/CustomSelect";
import AddProductModal from "../../components/products/AddProduct";
import { useState } from "react";
// import Table from "../components/products/Table";

const Stocks = () => {
  const handleSortSelect = (option: string) => {
    console.log("Selected sort option:", option);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleCategorySelect = (option: string) => {
  //   console.log("Selected category option:", option);
  // };

  return (
    <section>
      <div className=" mb-4 md:hidden">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Products List
        </h1>
        <p className="text-dark-gray dark:text-white">
          Detailed information about your products
        </p>
      </div>
      <section className="bg-white dark:bg-secondary-black p-4 ">
        <div className="flex justify-between w-full flex-col md:flex-row gap-2 items-center p-4 mb-4">
          <h1>Products</h1>
          <div className="flex text-dark-gray flex-col md:flex-row w-full gap-2">
            <CustomSelect
              options={["Best sellers", "New arrivals", "Top rated"]}
              defaultValue="Best sellers"
              onSelect={handleSortSelect}
            />
            {/* <CustomSelect
              options={["All Categories", "Electronics", "Fashion", "Home"]}
              defaultValue="All Categories"
              onSelect={handleCategorySelect}
            /> */}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-blue text-white w-full md:w-1/5 text-center px-2 py-2 rounded-[8px]"
          >
            Add Product
          </button>
        </div>
        <Table />
      </section>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Stocks;
