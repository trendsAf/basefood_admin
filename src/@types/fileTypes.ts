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
export type GetCropState = {
  isLoading: boolean;
  getError?: string | null;
  data: string[];
  error: string | null;
  cropList: string[];
};
export type AddCropState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
};
export type CropCategoryState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
  cropCategoryList: string[];
};
