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
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { useForm, Controller } from "react-hook-form";
  import { Link } from "react-router-dom";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  
  const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const schema = yup.object({
      firstName: yup
        .string()
        .min(3, "First name must be 8 characters long")
        .required("First name is required."),
      lastName: yup
        .string()
        .min(3, "Last name must be 8 characters long")
        .required("Last name is required."),
      email: yup.string().required("Email address is required."),
      password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    });
  
    const signUpDetails = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: signUpDetails,
      resolver: yupResolver(schema),
    });
  
    const signUpHandler = (data) => {
      console.log(data);
      reset();
    };
  
    return (
      <>
        <Container className="container">

          <Box className="container">
            <Typography variant="h4" className="text-center my-4">
              Sign Up
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
                    Register
                  </Button>
                  <Typography variant="body2" className="text-center mt-3">
                    <Link to="/">Go to home</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </>
    );
  };
  
  export default SignUp;
  