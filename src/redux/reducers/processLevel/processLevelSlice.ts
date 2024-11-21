import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { DynamicType, VarietyState } from "../../../@types/fileTypes";
import API from "../../api";

export const PostProcessLevel = createAsyncThunk(
  "country/postVariety",
  async (countryData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/admin/crops/process_state",
        countryData,
        {
          headers: { "X-CSRF-TOKEN": `${Cookies.get("access_token")}` },
          withCredentials: true,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as DynamicType)?.response?.data || "An error occurred",
      );
    }
  },
);

export const FetchProcessLevel = createAsyncThunk(
  "country/fetchProcessLevel",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/general_routes/crops/process_state", {
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

const processLevelSlice = createSlice({
  name: "processLevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostProcessLevel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        PostProcessLevel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(
        PostProcessLevel.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Failed to submit country";
        },
      )
      .addCase(FetchProcessLevel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        FetchProcessLevel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(
        FetchProcessLevel.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Failed to fetch varieties";
        },
      );
  },
});

export default processLevelSlice.reducer;
