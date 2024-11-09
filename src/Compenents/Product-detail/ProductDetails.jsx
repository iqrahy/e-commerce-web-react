import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const param = useParams();

  console.log(param, "param");

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        setIsLoader(true);
        const products = await axios.get(
          `https://fakestoreapi.com/products/${param?.product_id}`
        );
        console.log(products.data, "products");

        if (products.status === 200) {
          setIsLoader(false);
          setProductDetail(products.data);
        } else {
          setIsLoader(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchedProducts();
  }, []);

  return (
    <>
      {isLoader ? (
        <Box className="text-center mt-5 pt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container className="mt-5 pt-lg-5 container">
          <Grid item sm={12} md={6} className="text-center border d-flex justify-content-center align-items-center">
            <img className="img-fluid w-50" src={productDetail?.image} alt="" />
          </Grid>
          <Grid item sm={12} md={6} className="d-flex flex-column mt-5 pt-lg-5">
            <Typography variant="h4" className="fw-medium">
              {productDetail?.title}
            </Typography>
            <Typography variant="body1" className="fw-medium mt-3">
              {productDetail?.description}
            </Typography>
            <Typography
              variant="h5"
              className="fw-medium my-4"
            >{`$${productDetail?.price}`}</Typography>
            <Box>
              <Tooltip title="Add to cart">
                <Button
                  className="text-capitalize "
                  variant="contained"
                  color="error"
                >
                  Add to cart
                </Button>
              </Tooltip>
              <Tooltip title="Favorite">
                <FavoriteBorderIcon
                  className="fs-1 p-1 p-lg-2 ms-2 btn btn-light rounded-circle"
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
