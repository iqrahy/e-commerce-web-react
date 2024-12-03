import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SignUpImg from "../accets/sign-up.avif";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "./useSignUp";

const SignUp = () => {
  const {
    signUpHandler,
    control,
    handleSubmit,
    errors,
    showPassword,
    handleClickShowPassword,
  } = useSignUp();

  return (
    <>
      <Grid
        container
        className="container my-5 pt-5 d-flex justify-content-center"
      >
        <Grid item sx={12} md={6} className="text-center">
          <img className="img-fluid w-75" src={SignUpImg} alt="" />
        </Grid>
        <Grid item sx={12} md={6} className="mt-md-5">
          <Typography variant="h4" className="text-center mt-4">
            Sign Up
          </Typography>
          <Typography variant="body1" className="text-center mb-2">
            Create your account
          </Typography>

          <form onSubmit={handleSubmit(signUpHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="First Name"
                      {...field}
                    />
                  )}
                />
                <Typography color="error">
                  {errors?.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Last Name"
                      {...field}
                    />
                  )}
                />
                <Typography color="error">
                  {errors?.lastName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      fullWidth
                      type="email"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Email"
                      {...field}
                    />
                  )}
                />
                <Typography color="error">{errors?.email?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      size="small"
                      id="outlined-adornment-password"
                      variant="outlined"
                      placeholder="Password"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                    />
                  )}
                />
                <Typography color="error">
                  {errors?.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="text-capitalize"
                  fullWidth
                  color="error"
                >
                  Register
                </Button>
                <Typography variant="body2" className="text-center mt-3">
                  {" "}
                  Already have an account?
                  <Link to="/sign-in" className="text-danger">
                    {" "}
                    Log in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
