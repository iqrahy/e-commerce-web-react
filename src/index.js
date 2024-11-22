import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compenents/Layout/Layout";
import SignIn from "./Compenents/Sign-In/SignIn";
import SignUp from "./Compenents/Sign-Up/SignUp";
import App from "./App";
import Error from "./Compenents/Error/Error";
import ProductDetails from "./Compenents/Product-detail/ProductDetails";
import { store } from "./app/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "product-details/:product_id",
        element: <ProductDetails />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
