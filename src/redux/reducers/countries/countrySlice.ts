import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicType, CountryState } from "../../../@types/fileTypes";
import API from "../../api";

const token = import.meta.env.ACCESS_TOKEN;
export const country = createAsyncThunk(
  "country",
  async (countryData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/countries", countryData, {
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

const initialState: CountryState = {
  isLoading: false,
  error: null,
  data: [],
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(country.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(country.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(country.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Failed to submit country";
    });
  },
});

export default countrySlice.reducer;
