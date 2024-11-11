export type DynamicType = {
  [key: string]: any;
};

export type CountryTypes = {
  country_name: string;
  country_code: string;
};

export type CountryState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
};
export type CropState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
  cropList: string[];
};
export type CropCategoryState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
  cropCategoryList: string[];
};
