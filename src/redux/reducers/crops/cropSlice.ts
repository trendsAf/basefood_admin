/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  AddCropState,
  DynamicType,
  GetCropState,
} from "../../../@types/fileTypes";
import API from "../../api";

// Thunk to add a new crop
export const crop = createAsyncThunk(
  "crop",
  async (cropData: any, { rejectWithValue }) => {
    console.log("Data sent to API:", cropData);
    try {
      const { data } = await API.post("/admin/crops", cropData, {
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

export const getCrops = createAsyncThunk(
  "crop/getCrops",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/crops", {
        headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "Failed to fetch crops",
      );
    }
  },
);

const initialState: AddCropState | GetCropState = {
  isLoading: false,
  error: null,
  getError: null,
  data: [],
  cropList: [],
};

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(crop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crop.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(crop.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit crop";
      })
      .addCase(getCrops.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getCrops.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = null;
        state.cropList = action.payload;
      })
      .addCase(getCrops.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = action.payload?.message || "Failed to fetch crops";
      });
  },
});

export default cropSlice.reducer;
