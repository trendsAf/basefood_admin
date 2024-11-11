import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicType } from "../../../@types/fileTypes";
import API from "../../api";
import Cookies from "js-cookie";

interface GetCropsState {
  isLoading: boolean;
  error: string | null;
  cropList: any[];
}

// Async thunk to fetch crops
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

const initialState: GetCropsState = {
  isLoading: false,
  error: null,
  cropList: [],
};

const getCropsSlice = createSlice({
  name: "getCrops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCrops.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCrops.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.error = null;
        state.cropList = action.payload;
      })
      .addCase(getCrops.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch crops";
      });
  },
});

export default getCropsSlice.reducer;
