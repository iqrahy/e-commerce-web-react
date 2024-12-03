import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const useSignIn = () => {
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

  return {
    signInHandler,
    errors,
    handleSubmit,
    control,
    handleClickShowPassword,
    showPassword,
  };
};

export default useSignIn;
