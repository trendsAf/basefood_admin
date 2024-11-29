import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  AddProductState,
  DynamicType,
  GetProductState,
} from "../../../@types/fileTypes";
import API from "../../api";

export const PostProduct = createAsyncThunk(
  "product",
  async (cropData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/products", cropData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": `${Cookies.get("access_token")}`,
        },
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "An error occurred",
      );
    }
  },
);

export const getProducts = createAsyncThunk(
  "products/getproducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/products", {
        headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "Failed to fetch products",
      );
    }
  },
);

const initialState: AddProductState | GetProductState = {
  isLoading: false,
  error: null,
  getError: null,
  data: [],
  cropList: [],
};

const cropSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(PostProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit products";
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = null;
        state.cropList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = action.payload?.message || "Failed to fetch products";
      });
  },
});

export default cropSlice.reducer;
