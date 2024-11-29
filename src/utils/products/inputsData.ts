const formData = {
  name: "",
  country: "",
  region: "",
  cropVariety: "",
  price: "",
};
export const inputsData = [
  {
    id: "name",
    label: "Crop Name",
    type: "text",
    value: formData.name,
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    value: formData.country,
  },
  {
    id: "region",
    label: "Region",
    type: "text",
    value: formData.region,
  },
  {
    id: "cropVariety",
    label: "Crop Variety",
    type: "text",
    value: formData.cropVariety,
  },
  {
    id: "price",
    label: "Price (per ton)",
    type: "text",
    value: formData.price,
    placeholder: "$0.00",
  },
];
