import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const useSignUp = () => {
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

  return {
    signUpHandler,
    control,
    handleSubmit,
    errors,
    showPassword,
    handleClickShowPassword,
  };
};

export default useSignUp;
