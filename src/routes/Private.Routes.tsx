import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import SessionTimeoutHook from "../redux/hooks/SessionTimeoutHook";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const access_token = Cookies?.get("access_token");

  useEffect(() => {
    if (!access_token) {
      navigate("/login", { replace: true });
    }
  }, [access_token, navigate]);

  return access_token ? (
    <SessionTimeoutHook>
      <Outlet />
    </SessionTimeoutHook>
  ) : null;
};

export default PrivateRoutes;
