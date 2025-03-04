import { TbPlant, TbChartBar, TbCloudComputing, TbUsers } from "react-icons/tb";
import Logo from "../../assets/basefood_lowercase.png";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { lazy } from "react";

const LoginFormComponent = lazy(
  () => import("../../components/auth/LoginFormComponent"),
);

const Login = () => {
  const features = [
    "Aggregate and analyze agricultural data from multiple sources",
    "Visualize crop yields and market trends in real-time",
    "Leverage AI for predictive farming insights",
    "Connect with a network of farmers and agri-experts",
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <div className="bg-white flex h-screen">
      <div className="hidden lg:flex flex-col w-[50%] h-full relative">
        <div className="absolute w-full h-full bg-black/70 inset-0 z-10"></div>
        <div className="w-full h-full">
          <img
            src="https://res.cloudinary.com/dq6npfdgz/image/upload/v1725875253/data_image7_tqfxiu.jpg"
            alt="Agricultural landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-8 left-8 z-30">
          <img
            className="text-white w-[8rem] font-bold"
            src={Logo}
            alt="baseFood"
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <h1 className="lg:text-3xl xl:text-4xl 2xl:text-5xl font-black mb-8">
            Cultivate smarter decisions
          </h1>
          <div className="flex flex-col justify-center gap-6 w-full max-w-md">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {idx === 0 && (
                  <TbPlant className="text-2xl xl:text-3xl 2xl:text-4xl mb-4 flex-shrink-0" />
                )}
                {idx === 1 && (
                  <TbChartBar className="text-2xl xl:text-3xl 2xl:text-4xl mb-4 flex-shrink-0" />
                )}
                {idx === 2 && (
                  <TbCloudComputing className="text-2xl xl:text-3xl 2xl:text-4xl mb-4 flex-shrink-0" />
                )}
                {idx === 3 && (
                  <TbUsers className="text-2xl xl:text-3xl 2xl:text-4xl mb-4 flex-shrink-0" />
                )}
                <p className="text-lg xl:text-xl 2xl:text-2xl helvetica">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center w-[50%] bg-[url('https://res.cloudinary.com/dq6npfdgz/video/upload/v1725639485/4778066-uhd_2562_1440_25fps_ytvf2g.mp4')]">
        <div className="px-2 flex flex-col items-center justify-center space-y-6 w-[80%] h-3/5 rounded-lg">
          <div className="w-full max-w-md 2xl:max-w-lg">
            <h1 className="text-2xl 2xl:text-3xl  text-center mb-10 text-black">
              Log in to your <b className="font-black 2xl:text-3xl">basefood</b>{" "}
              Admin
            </h1>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LoginFormComponent />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
