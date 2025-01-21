import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DynamicType,
  LoginTypes,
  ReducerTypes,
} from "../../../@types/fileTypes";
import API from "../../api";

export const login = createAsyncThunk(
  "login",
  async (loginData: LoginTypes, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", loginData);
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.message = action.payload.message;

      state.error = null;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error =
        action.payload?.data?.message || "An error occurred during login";
    });
  },
});

export default loginSlice.reducer;
