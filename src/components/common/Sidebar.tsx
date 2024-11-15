/* eslint-disable no-console */
import { createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiFruitBowl, GiThreeLeaves, GiWorld } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { MdEventRepeat, MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/basefood_logo.png";
import { base_food_white_logo } from "../../assets/images";
import { RootState } from "../../redux/store";
import LogoutModal from "../modals/Logout";
import ModeToggle from "./ModeToggle";
import { MdHub } from "react-icons/md";

const tooltipTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1e293b",
          color: "#ffffff",
          fontSize: "14px",
          padding: "4px 12px",
          borderRadius: "4px",
          fontFamily: "Helvetica Neue",
        },
        arrow: {
          color: "#1e293b",
        },
      },
    },
  },
});

interface SidebarProps {
  isSidebarVisible: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Sidebar = ({
  isSidebarVisible,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [theme]);

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  const handleCloseModal = () => {
    setOpenLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out");
    setOpenLogoutModal(false);
  };

  return (
    <>
      <div
        className={`fixed z-40 left-0 top-0 h-[100vh] ${
          isCollapsed
            ? "w-20 border-r border-bg-gray dark:border-[#404040]"
            : "w-[80%] sm:w-[40%] md:w-[30%] lg:w-[16%] md:transition-none transition-all duration-300"
        } border-r border-bg-gray dark:border-[#404040] bg-white px-4 flex flex-col  justify-between dark:bg-[#252525] transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div
            className={`flex items-center justify-between px-4 py-6 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {!isCollapsed && (
              <div className="flex items-center">
                {/* <FiDatabase className="text-2xl text-blue-600 mr-2" />
                <span className="text-xl logo font-bold text-blue-600">
                  baseFood
                </span> */}
                <img
                  src={Logo}
                  alt="basefood"
                  className="w-[8rem] dark:hidden"
                />
                <img
                  src={base_food_white_logo}
                  alt="basefood"
                  className="w-[8rem] hidden dark:flex"
                />
              </div>
            )}
            <button
              onClick={toggleCollapse}
              className="hidden md:block focus:outline-none"
            >
              <FaBars className="text-gray-900 dark:text-white" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col justify-center">
            <ul className="flex flex-col space-y-4">
              <NavLink
                to="/"
                //@ts-ignore
                activeclassname="active"
              >
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Today's Market" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <GoHome className="text-lg whitespace-nowrap text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Dashboard
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="countries">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Countries" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <GiWorld className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Countries
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="regions">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Region" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <FaLocationDot className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Region
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="crop_categories">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Crop Category" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <GiFruitBowl className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Crops category
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="crops">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Crops" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <GiThreeLeaves className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Crops
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="variety">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Crop variety" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <MdHub className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Crops variety
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
              <NavLink to="process_level">
                <ThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={`${isCollapsed ? "Process level" : ""}`}
                    placement="right"
                  >
                    <li className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded">
                      <MdEventRepeat className="text-lg text-gray-900 dark:text-white" />
                      {!isCollapsed && (
                        <span className="ml-4 text-gray-900 dark:text-white">
                          Process level
                        </span>
                      )}
                    </li>
                  </Tooltip>
                </ThemeProvider>
              </NavLink>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col space-y-2 py-4">
          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={`${isCollapsed ? "Logout" : ""}`} placement="right">
              <button
                onClick={handleLogoutClick}
                className="flex items-center py-2 px-4  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <MdOutlineLogout className="text-md" />
                {!isCollapsed && <span className="ml-4">Logout</span>}
              </button>
            </Tooltip>
          </ThemeProvider>
          <ModeToggle
            sidebar={true}
            isCollapsed={isCollapsed}
            isDarkMode={theme === "dark"}
          />
        </div>
      </div>
      <LogoutModal
        open={openLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
