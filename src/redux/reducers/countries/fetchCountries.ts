import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicType } from "../../../@types/fileTypes";
import API from "../../api";
import Cookies from "js-cookie";

// const token = import.meta.env.ACCESS_TOKEN;
export const fetchCountries = createAsyncThunk(
  "fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/countries", {
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

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const countrySlice = createSlice({
  name: "fetchCountries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCountries.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      },
    );
    builder.addCase(
      fetchCountries.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit country";
      },
    );
  },
});

export default countrySlice.reducer;
