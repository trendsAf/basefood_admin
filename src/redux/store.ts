import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import countriesSlice from "./reducers/countries/countrySlice";
import cropsReducer from "./reducers/crops/cropSlice";
import cropCategoryReducer from "./reducers/crops/cropCategorySlice";
import getCropReducer from "./reducers/crops/getCropSlice";
import addCropReducer from "./reducers/crops/addCropSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice,
    crops: cropsReducer,
    cropCategory: cropCategoryReducer,
    getCrops: getCropReducer,
    addCrops: addCropReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
