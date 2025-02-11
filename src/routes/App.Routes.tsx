import { SkeletonTheme } from "react-loading-skeleton";
import { Route, Routes } from "react-router-dom";
import CountriesComponent from "../components/countries/CountriesComponent";
import CropsComponent from "../components/crops/CropsComponent";
import CropCategoriesComponent from "../components/crops_categories/CropCategoriesComponent";
import RootLayout from "../components/layouts/RootLayout";
import ProcessLevelComponent from "../components/processLevel/ProcessLevelComponent";
import RegionComponent from "../components/region/RegionComponent";
import VarietyComponent from "../components/variety/VarietyComponent";
import Analitics from "../pages/analitics/Analitics";
import AdminResetPassword from "../pages/auth/AdminResetPassword";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Index";
import Products from "../pages/products/ProductsPage";
import PrivateRoutes from "./Private.Routes";

const AppRoutes = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password/:token" element={<AdminResetPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/crops" element={<CropsComponent />} />
            <Route path="/countries" element={<CountriesComponent />} />
            <Route path="/regions" element={<RegionComponent />} />
            <Route
              path="/crop_categories"
              element={<CropCategoriesComponent />}
            />
            <Route path="/process_level" element={<ProcessLevelComponent />} />
            <Route path="/variety" element={<VarietyComponent />} />
            <Route path="/products" element={<Products />} />
            <Route path="/analitics" element={<Analitics />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="flex w-full h-screen items-center justify-center text-3xl logo">
              {" "}
              Page not found
            </div>
          }
        />
      </Routes>
    </SkeletonTheme>
  );
};

export default AppRoutes;
