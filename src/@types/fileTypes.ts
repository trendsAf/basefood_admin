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
  data: any[];
};
export type GetCropState = {
  isLoading: boolean;
  getError?: string | null;
  data: string[];
  error: string | null;
  cropList: any[];
};

export type AddCropState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
};

export type AddProductState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
};
export type AddAnalyticState = {
  isLoading: boolean;
  error: string | null;
  data: string;
};

export type GetProductState = {
  isLoading: boolean;
  getError?: string | null;
  data: string[];
  error: string | null;
  cropList: any[];
};

export type GetRegionState = {
  isLoading: boolean;
  getError?: string | null;
  data: string[];
  error: string | null;
  regionList: [];
};
export type AddRegionState = {
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

export type VarietyState = {
  isLoading: boolean;
  error: string | null;
  data: string[];
};

export type ReducerTypes = {
  isLoading: boolean;
  data?: DynamicType;
  error: string | null;
  isVerified?: boolean;
  message?: string | null;
};

export type LoginTypes = {
  email: string;
  password: string;
};
export type ResetTypes = {
  initial_password: string;
  new_password: string;
  confirm_password?: string;
};
