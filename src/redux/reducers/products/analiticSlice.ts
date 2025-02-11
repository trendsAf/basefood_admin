import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddAnalyticState, DynamicType } from "../../../@types/fileTypes";
import API from "../../api";

export const PostAnalytics = createAsyncThunk(
  "product",
  async (file_id: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/products/import", {
        file_id,
        // headers: {
        //   "Content-Type": "application/json",
        //   "X-CSRF-TOKEN": `${Cookies.get("access_token")}`,
        // },
        // withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "An error occurred",
      );
    }
  },
);

const initialState: AddAnalyticState = {
  isLoading: false,
  error: null,
  data: "",
};

const analyticSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostAnalytics.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(PostAnalytics.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit products";
      });
  },
});

export default analyticSlice.reducer;
