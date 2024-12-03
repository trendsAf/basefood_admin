import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { FetchCountries } from "../../../redux/reducers/countries/countrySlice";
import { getCropsCategory } from "../../../redux/reducers/crops/cropCategorySlice";
import { getCrops } from "../../../redux/reducers/crops/cropSlice";
import { getRegions } from "../../../redux/reducers/regions/regionSlice";
import { FetchVarieties } from "../../../redux/reducers/variety/varietySlice";
import { ProductFormValidation } from "../../../validations/formValidations";
import { PostProduct } from "../../../redux/reducers/products/productSlice";
import { toast, ToastContainer } from "react-toastify";

interface AddProductModalProps {
  toggleAddProduct: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  toggleAddProduct,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductFormValidation),
  });

  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [selectedVariety, setSlectedVariety] = useState<string | number>("");
  const [selectedRegion, setSelectedRegion] = useState<string | number>("");

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.products);
  const { cropCategoryList: crop_categories } = useAppSelector(
    (state) => state.cropCategory,
  );
  const { cropList: crops } = useAppSelector((state) => state.crops);
  const { data: countries } = useAppSelector((state) => state.countries);
  const { data: varieties } = useAppSelector((state) => state.viriety);
  const { regionList: regions } = useAppSelector((state) => state.regions);

  useEffect(() => {
    dispatch(getCrops());
    dispatch(FetchCountries());
    dispatch(FetchVarieties());
    dispatch(getRegions());
    dispatch(getCropsCategory());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    try {
      const res = await dispatch(PostProduct(data)).unwrap();
      toast.success(res.message || "Product added successfully!");
      setTimeout(() => {
        toggleAddProduct();
      }, 3500);
    } catch (error: any) {
      toast.error(error.message || "Failed to add product.");
    }
  };

  const filteredCrops = Array.isArray(crops)
    ? crops.filter((crop: any) => crop.crop_category === selectedCategory)
    : [];

  const filteredVarietis = Array.isArray(varieties)
    ? varieties.filter((variety: any) => variety.crop_id === selectedVariety)
    : [];

  const filteredRegions = Array.isArray(regions)
    ? regions.filter((region: any) => region.country_id === selectedRegion)
    : [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-black rounded-lg p-6 w-full max-w-4xl _shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl logo text-center text-black dark:text-white w-full">
            Add New Product
          </h2>
          <div className="absolute right-0 -top-2">
            <button
              onClick={() => toggleAddProduct()}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
            >
              <IoCloseSharp className="text-4xl hover:text-red" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 px-8 py-4"
        >
          {/* Crop Category */}
          <Controller
            name="crop_category"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  error={!!errors.crop_category}
                  displayEmpty
                  onChange={(event) => {
                    field.onChange(event);
                    setSelectedCategory(event.target.value);
                  }}
                  value={field.value ?? ""}
                >
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
                  {Array.isArray(crop_categories) &&
                  crop_categories.length === 0 ? (
                    <MenuItem>No categories found</MenuItem>
                  ) : (
                    Array.isArray(crop_categories) &&
                    crop_categories.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.crop_category && (
                  <p className="text-sm text-red mt-1">
                    {errors.crop_category.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Crop Name */}
          <Controller
            name="crop_id"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  error={!!errors.crop_id}
                  displayEmpty
                  onChange={(event) => {
                    field.onChange(event);
                    setSlectedVariety(event.target.value);
                  }}
                >
                  <MenuItem value={undefined} disabled>
                    Select a crop
                  </MenuItem>
                  {Array.isArray(filteredCrops) &&
                  filteredCrops.length === 0 ? (
                    <MenuItem>No crops found</MenuItem>
                  ) : (
                    Array.isArray(filteredCrops) &&
                    filteredCrops.map((crop: any) => (
                      <MenuItem key={crop.id} value={crop.id}>
                        {crop.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.crop_id && (
                  <p className="text-sm text-red mt-1">
                    {errors.crop_id.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Crop Variety */}
          <Controller
            name="crop_variety_id"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  error={!!errors.crop_variety_id}
                  displayEmpty
                >
                  <MenuItem value={undefined} disabled>
                    Select a crop variety
                  </MenuItem>
                  {Array.isArray(filteredVarietis) &&
                  filteredVarietis.length === 0 ? (
                    <MenuItem>No varieties found</MenuItem>
                  ) : (
                    Array.isArray(filteredVarietis) &&
                    filteredVarietis.map((variety: any) => (
                      <MenuItem key={variety.id} value={variety.id}>
                        {variety.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.crop_variety_id && (
                  <p className="text-sm text-red mt-1">
                    {errors.crop_variety_id.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Country */}
          <Controller
            name="country_id"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  error={!!errors.country_id}
                  displayEmpty
                  onChange={(event) => {
                    field.onChange(event);
                    setSelectedRegion(event.target.value);
                  }}
                >
                  <MenuItem value={undefined} disabled>
                    Select a country
                  </MenuItem>
                  {Array.isArray(countries) && countries.length === 0 ? (
                    <MenuItem>No countries found</MenuItem>
                  ) : (
                    Array.isArray(countries) &&
                    countries.map((country: any) => (
                      <MenuItem key={country.code} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.country_id && (
                  <p className="text-sm text-red mt-1">
                    {errors.country_id.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Region */}
          <Controller
            name="region_id"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  error={!!errors.region_id}
                  displayEmpty
                >
                  <MenuItem value={undefined} disabled>
                    Select a region
                  </MenuItem>
                  {Array.isArray(filteredRegions) &&
                  filteredRegions.length === 0 ? (
                    <MenuItem>No regions found</MenuItem>
                  ) : (
                    Array.isArray(filteredRegions) &&
                    filteredRegions.map((region: any) => (
                      <MenuItem key={region.region_id} value={region.region_id}>
                        {region.region_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.region_id && (
                  <p className="text-sm text-red mt-1">
                    {errors.region_id.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Price Field */}
          <Controller
            name="price"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  placeholder="$0.00"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-2 col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-brand-blue text-white rounded-md w-full ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductModal;
