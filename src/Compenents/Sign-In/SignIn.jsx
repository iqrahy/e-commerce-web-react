import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
 import SignInImg from '../accets/sign-in.jpg'
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { Controller, useForm } from "react-hook-form";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  
  const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const schema = yup.object({
      email: yup.string().required("Email address is required."),
      password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be 8 characters long"),
    });
  
    const signIpDetails = {
      email: "",
      password: "",
    };
  
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: signIpDetails,
      resolver: yupResolver(schema),
    });
  
    const signInHandler = (data) => {
      console.log(data);
      reset();
    };
  
    return (
      <>
        <Grid container className="container my-5 pt-md-5 d-flex justify-content-center">
          <Grid item sx={12} md={6}>
            <img className="img-fluid text-center" src={SignInImg} alt="" />
          </Grid>
          <Grid item sx={12} md={6} className="mt-md-4">
          <Box>
            <Typography variant="h4" className="text-center mt-4">
              Sign In
            </Typography>
            <Typography variant="body1" className="text-center mb-4">
            Enter your credential to login
            </Typography>
  
            <form onSubmit={handleSubmit(signInHandler)}>
              <Grid container spacing={2}>
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
                  <Typography color="error">
                    {errors?.email?.message}
                  </Typography>
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
                    Sign In
                  </Button>

                  <Typography variant="body2" className="text-center mt-3"> Don't have an account?
                    <Link to="/sign-up" className="text-danger">Sign Up</Link>
                  </Typography>
                 
                </Grid>
              </Grid>
            </form>
          </Box>
          </Grid>
         
        </Grid>
      </>
    );
  };
  
  export default SignIn;
  