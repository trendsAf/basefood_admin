import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicType, CountryState } from "../../../@types/fileTypes";
import API from "../../api";
import Cookies from "js-cookie";

export const PostCountry = createAsyncThunk(
  "country/postCountry",
  async (countryData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/admin/countries", countryData, {
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

export const FetchCountries = createAsyncThunk(
  "country/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/countries", {
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
    builder
      .addCase(PostCountry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PostCountry.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(PostCountry.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit country";
      })
      .addCase(FetchCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        FetchCountries.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(FetchCountries.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch countries";
      });
  },
});

export default countrySlice.reducer;
