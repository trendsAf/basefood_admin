import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const AdminResetPassword = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <div className="h-screen flex items-center justify-center">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResetPasswordForm />
      </ThemeProvider>
    </div>
  );
};

export default AdminResetPassword;
