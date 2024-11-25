import React, { useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    region: "",
    cropVariety: "",
    price: "",
    image: "",
  });

  const cropTypes = [
    "Cereal",
    "Coffee",
    "Legume",
    "Rice",
    "Fruit",
    "Vegetable",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-black rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Add New Crop
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Crop Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            >
              <option value="">Select type</option>
              {cropTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Region
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Crop Variety
            </label>
            <input
              type="text"
              name="cropVariety"
              value={formData.cropVariety}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Price (per ton)
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$0.00"
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] px-3 py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Image
            </label>
            <input
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-800 text-dark-gray border dark:border-gray-700 dark:text-white dark:bg-secondary-black rounded-[5px] py-1 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-600"
            >
              Add Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
