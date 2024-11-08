import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import ProtectedRoute from "../ProtectRoutes";

const RootLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  return (
    // <ProtectedRoute>
    <div className="bg-bg-gray dark:bg-black flex min-h-screen relative w-[100%]">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={` overflow-x-hidden
           flex flex-col relative w-[100%] md:w-[100%] gap-2`}
      >
        <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        <main
          className={`py-4 px-8 mt-20 transition-transform w-[100%] sm:w-[100%] md:w-[100%] ${
            isCollapsed
              ? "lg:w-[95%] lg:ml-[5%] w-[100%]"
              : "lg:w-[85%] lg:ml-[15%] w-[100%]"
          }  duration-300`}
        >
          <Outlet />
        </main>
      </div>
      {isSidebarVisible && (
        <div
          className="fixed inset-0 left-[20%] bg-black bg-opacity-25 z-30 xl:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
    // </ProtectedRoute>
  );
};

export default RootLayout;
