import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import countriesSlice from "./reducers/countries/countrySlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
