/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicType } from "../../../@types/fileTypes";
import API from "../../api";
import Cookies from "js-cookie";

interface AddCropState {
  isLoading: boolean;
  error: string | null;
  data: any | null;
}

export const addCrop = createAsyncThunk(
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

const initialState: AddCropState = {
  isLoading: false,
  error: null,
  data: null,
};

const addCropSlice = createSlice({
  name: "addCrop",
  initialState,
  reducers: {
    addCropPending(state) {
      state.isLoading = true;
      state.error = null;
    },
    addCropFulfilled(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    addCropRejected(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = action.payload?.message || "Failed to submit crop";
    },
  },
});

export const { addCropPending, addCropFulfilled, addCropRejected } =
  addCropSlice.actions;

export default addCropSlice.reducer;
