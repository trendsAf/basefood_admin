import { useState } from "react";
import AddProductModal from "../../components/products/crude/AddProduct";
// import CustomSelect from "../../components/common/select/CustomSelect";
import Table from "../../components/products/Table";
import { MdAddCircle } from "react-icons/md";

const ProductsPage = () => {
  // const handleSortSelect = (option: string) => {
  //   console.log("Selected sort option:", option);
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleProductModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <div className="flex justify-between w-full flex-col md:flex-row gap-2 items-center p-4 font-bold italic text-2xl">
          <h1>Products</h1>
          {/* <div className="flex text-dark-gray flex-col md:flex-row w-full gap-2">
            <CustomSelect
              options={["Best sellers", "New arrivals", "Top rated"]}
              defaultValue="Best sellers"
              onSelect={handleSortSelect}
            />
          </div> */}
          <div className="w-full flex items-center justify-end">
            <button
              className="bg-brand-blue hover:bg-blue-500 px-4 py-2 flex items-center gap-1 text-lg rounded text-white font-normal"
              onClick={() => toggleProductModal()}
            >
              <MdAddCircle className="text-2xl" />
              Add Products
            </button>
          </div>
        </div>
        <Table />
      </section>
      {isModalOpen && (
        <AddProductModal toggleAddProduct={() => toggleProductModal()} />
      )}
    </section>
  );
};

export default ProductsPage;
