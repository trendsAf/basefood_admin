import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  AddRegionState,
  DynamicType,
  GetRegionState,
} from "../../../@types/fileTypes";
import API from "../../api";

export const PostRegion = createAsyncThunk(
  "region",
  async (cropData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/countries/regions", cropData, {
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

export const getRegions = createAsyncThunk(
  "region/getRegions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/regions", {
        headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "Failed to fetch regions",
      );
    }
  },
);

const initialState: AddRegionState | GetRegionState = {
  isLoading: false,
  error: null,
  getError: null,
  data: [],
  regionList: [],
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostRegion.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(PostRegion.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit region";
      })
      .addCase(getRegions.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getRegions.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = null;
        state.regionList = action.payload;
      })
      .addCase(getRegions.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.getError = action.payload?.message || "Failed to fetch regions";
      });
  },
});

export default regionSlice.reducer;
