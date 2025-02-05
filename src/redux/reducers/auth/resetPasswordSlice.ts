import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DynamicType,
  ResetTypes,
  ReducerTypes,
} from "../../../@types/fileTypes";
import API from "../../api";

export const resetPassword = createAsyncThunk(
  "reset_password",
  async (
    { resetData, token }: { resetData: ResetTypes; token: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await API.post(
        `/admin/reset_password/${token}`,
        resetData,
      );
      console.log(response, "Reeeeeesppppooosd=>>>>>>>>>>>>");
      return response.data;
    } catch (error) {
      return rejectWithValue((error as DynamicType).response);
    }
  },
);

const initialState: ReducerTypes = {
  isLoading: false,
  error: null,
  message: null,
};

const resetPasswordSlice = createSlice({
  name: "reset_password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      resetPassword.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload.message;

        state.error = null;
      },
    );
    builder.addCase(
      resetPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error =
          action.payload?.data?.message || "An error occurred during login";
      },
    );
  },
});

export default resetPasswordSlice.reducer;
