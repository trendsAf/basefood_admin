import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CropState, DynamicType } from "../../../@types/fileTypes";
import API from "../../api";

const token = import.meta.env.ACCESS_TOKEN;
export const crop = createAsyncThunk(
  "crop",
  async (cropData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/crops", cropData, {
        headers: { "X-CSRF-TOKEN": token },
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

const initialState: CropState = {
  isLoading: false,
  error: null,
  data: [],
};

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(crop.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(crop.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(crop.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Failed to submit crop";
    });
  },
});

export default cropSlice.reducer;
