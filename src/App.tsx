import AppRoutes from "./routes/App.Routes";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
