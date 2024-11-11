import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  base_food_black_logo,
  base_food_white_logo,
} from "../../assets/images";
import ModeToggle from "./ModeToggle";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [theme]);
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
  return (
    <ThemeProvider theme={tooltipTheme}>
      <nav className="border-b text-black p-4 fixed w-full bg-white z-50 dark:text-white dark:bg-black dark:border-b-[#252525]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-10 ">
            <img
              src={base_food_black_logo}
              alt=""
              className="w-full h-full object-cover dark:hidden"
            />
            <img
              src={base_food_white_logo}
              alt=""
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle isCollapsed={false} isDarkMode={theme == "dark"} />
            <Link to="/login" className="hover:underline mr-5 md:text-lg logo">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navbar;
