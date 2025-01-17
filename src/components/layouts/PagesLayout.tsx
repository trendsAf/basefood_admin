import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const PagesLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <main className="flex-1 pb-10">{children}</main> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default PagesLayout;
