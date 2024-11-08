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
        <Container>
          <Box>
            <Typography variant="h4" className="text-center my-4">
              Sign In
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
  
  export default SignIn;
  