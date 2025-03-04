import { SkeletonTheme } from "react-loading-skeleton";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RotatingSquare } from "react-loader-spinner";
import logo from "../assets/basefood_logo.png";

const UsedLink = lazy(() => import("../components/auth/UsedLink"));
const PrivateRoutes = lazy(() => import("./Private.Routes"));
const Products = lazy(() => import("../pages/products/ProductsPage"));
const Dashboard = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/auth/Login"));
const AdminResetPassword = lazy(
  () => import("../pages/auth/AdminResetPassword"),
);
const Analitics = lazy(() => import("../pages/analitics/Analitics"));
const VarietyComponent = lazy(
  () => import("../components/variety/VarietyComponent"),
);
const ProcessLevelComponent = lazy(
  () => import("../components/processLevel/ProcessLevelComponent"),
);
const RootLayout = lazy(() => import("../components/layouts/RootLayout"));
const CropCategoriesComponent = lazy(
  () => import("../components/crops_categories/CropCategoriesComponent"),
);
const RegionComponent = lazy(
  () => import("../components/region/RegionComponent"),
);
const CropsComponent = lazy(() => import("../components/crops/CropsComponent"));
const CountriesComponent = lazy(
  () => import("../components/countries/CountriesComponent"),
);

const AppRoutes = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Suspense
        fallback={
          <div className="flex items-center lg:flex-row flex-col justify-center h-screen bg-[#252525] gap-2">
            <RotatingSquare
              visible={true}
              height="100"
              width="100"
              color="#2563EB"
              ariaLabel="rotating-square-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div className="w-1/4 h-auto">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover animate-pulse"
              />
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/reset_password/:token"
            element={<AdminResetPassword />}
          />
          <Route path="/reset_password" element={<UsedLink />} />

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
              <Route
                path="/process_level"
                element={<ProcessLevelComponent />}
              />
              <Route path="/variety" element={<VarietyComponent />} />
              <Route path="/products" element={<Products />} />
              <Route path="/analitics" element={<Analitics />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <div className="flex w-full h-screen items-center justify-center text-3xl logo">
                Page not found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </SkeletonTheme>
  );
};

export default AppRoutes;
