import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./reducers/countries/countrySlice";
import cropCategoryReducer from "./reducers/crops/cropCategorySlice";
import cropsReducer from "./reducers/crops/cropSlice";
import themeReducer from "./reducers/themeReducer";
import varietyReducer from "./reducers/variety/varietySlice";
import processLevelReducer from "./reducers/processLevel/processLevelSlice";
import regionReducer from "./reducers/regions/regionSlice";
import productReducer from "./reducers/products/productSlice";
import loginReducer from "./reducers/auth/loginSlice";
import resetPasswordReducer from "./reducers/auth/resetPasswordSlice";
import analyticsReducer from "./reducers/products/analiticSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice,
    crops: cropsReducer,
    cropCategory: cropCategoryReducer,
    viriety: varietyReducer,
    processLevel: processLevelReducer,
    regions: regionReducer,
    products: productReducer,
    login: loginReducer,
    reset_password: resetPasswordReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
