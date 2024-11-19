import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { DynamicType, VarietyState } from "../../../@types/fileTypes";
import API from "../../api";

export const PostVariety = createAsyncThunk(
  "country/postVariety",
  async (countryData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/crops/variety", countryData, {
        headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
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

export const FetchVarieties = createAsyncThunk(
  "country/fetchVarieties",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/crops/varieties", {
        headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
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

const initialState: VarietyState = {
  isLoading: false,
  error: null,
  data: [],
};

const varietySlice = createSlice({
  name: "virieties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostVariety.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostVariety.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(PostVariety.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit country";
      })
      .addCase(FetchVarieties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        FetchVarieties.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(FetchVarieties.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch varieties";
      });
  },
});

export default varietySlice.reducer;
