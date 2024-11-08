import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compenents/Layout/Layout";
import SignIn from "./Compenents/Sign-In/SignIn";
import SignUp from "./Compenents/Sign-Up/SignUp";
import App from "./App";
import Error from "./Compenents/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "",
        element: <App />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
