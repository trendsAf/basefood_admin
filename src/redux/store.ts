import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./reducers/countries/countrySlice";
import cropCategoryReducer from "./reducers/crops/cropCategorySlice";
import cropsReducer from "./reducers/crops/cropSlice";
import themeReducer from "./reducers/themeReducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice,
    crops: cropsReducer,
    cropCategory: cropCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
