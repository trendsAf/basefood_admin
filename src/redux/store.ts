import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import countriesSlice from "./reducers/countries/countrySlice";
import fetchCountriesReducer from "./reducers/countries/fetchCountries";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice,
    countriesdata: fetchCountriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
