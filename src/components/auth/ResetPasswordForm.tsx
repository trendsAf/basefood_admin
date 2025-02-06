import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useAppDispatch,
  //  useAppSelector
} from "../../redux/hooks";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../redux/reducers/auth/resetPasswordSlice";

interface FormData {
  initial_password: string;
  new_password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  initial_password: yup.string().required("Initial password is required"),
  new_password: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .matches(/[0-9]/, "New password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "New password must contain at least one special character",
    )
    .required("New password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [showInitialPassword, setShowInitialPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const token = pathParts[pathParts.length - 1];

  // const { data } = useAppSelector((state) => state.reset_password);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleClickShowInitialPassword = () =>
    setShowInitialPassword((prev) => !prev);
  const handleClickShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const resetData = {
        initial_password: formData.initial_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      };

      if (token) {
        await dispatch(resetPassword({ resetData, token }));
        console.log(
          `Reset data: ${JSON.stringify(resetData)}\n Token: ${token}`,
        );
      } else {
        throw new Error("Token is missing");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      console.log(`token:${token}`);
    }
  };

  return (
    <div className="w-2/5 mx-auto p-8 bg-white _shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Controller
            name="initial_password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Initial Password"
                type={showInitialPassword ? "text" : "password"}
                size="small"
                variant="outlined"
                error={!!errors.initial_password}
                helperText={errors.initial_password?.message}
                className="text-sm"
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowInitialPassword}
                        edge="end"
                      >
                        {showInitialPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                size="small"
                variant="outlined"
                error={!!errors.new_password}
                helperText={errors.new_password?.message}
                className="text-sm"
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                variant="outlined"
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                className="text-sm"
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        <div className="mt-6">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className="py-2"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
