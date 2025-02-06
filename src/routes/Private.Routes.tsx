import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const access_token = Cookies?.get("access_token");
  return access_token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
