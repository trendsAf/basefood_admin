/* eslint-disable no-console */
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginTypes } from "../../@types/fileTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginSchema } from "../../validations/formValidations";
import GoogleButton from "../common/buttons/GoogleButton";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { decodeToken } from "../../utils/config/decode";
import { login } from "../../redux/reducers/auth/loginSlice";
import { CirclesWithBar, ThreeDots } from "react-loader-spinner";

const LoginFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginTypes>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.login);

  const onSubmit = async (data: LoginTypes) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      console.log(res, "Reeeeeesssssponse");
      if (res && res?.access_token) {
        Cookies.set("access_token", res?.access_token);
        toast.success("You're logged in");
        const decodedToken = decodeToken(res?.access_token);
        Cookies.set("userInfo", JSON.stringify(decodedToken));
        setTimeout(() => {
          navigate("/");
        }, 3500);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md 2xl:max-w-lg"
      >
        <div className="flex flex-col gap-6">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                className="bg-white "
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                fullWidth
                className="bg-white"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            )}
          />

          <div className="flex justify-center">
            <button
              className="text-white text-center bg-brand-blue px-5 py-3 w-full rounded-[5px] font-bold hover:bg-blue-600 transition-all duration-300 xl:text-xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <CirclesWithBar
                    visible={true}
                    height="30"
                    width="30"
                    color="#ffff"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  Processing
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="30"
                    color="#ffff"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </form>
      {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>} */}
      <div className="flex justify-center items-center w-full">
        <Link to={"/forgot_password"} className="w-full">
          <button className="text-center text-sm xl:text-lg my-5 text-brand-blue">
            Forgot password?
          </button>
        </Link>
      </div>
      <div>
        <div className="flex justify-center my-4">
          <GoogleButton />
        </div>
        <div className="flex justify-center my-4">
          <button
            type="button"
            className=" bg-[#e5e5e5] text-black px-5 py-3 w-full rounded-[5px] font-medium hover:bg-[#d1d0d0] transition-all  duration-300 flex items-center justify-center gap-3 2xl:text-xl"
          >
            <FaLinkedinIn className="text-2xl text-blue-700" />
            Continue with Linkedin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;
