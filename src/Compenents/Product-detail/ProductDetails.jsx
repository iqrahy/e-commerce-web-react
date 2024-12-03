import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useProductDetail from "./useProductDetail";

const ProductDetails = () => {
  
  const {productDetail , isLoader} = useProductDetail()

  return (
    <>
      {isLoader ? (
        <Box className="text-center mt-5 pt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container className="mt-5 pt-5 container">
          <Grid item sm={12} md={6} className="text-center d-flex justify-content-center align-items-center">
            <img className="img-fluid w-50" src={productDetail?.image} alt="" />
          </Grid>
          <Grid item sm={12} md={6} className="d-flex flex-column mt-5 pt-lg-5">
            <Typography variant="h4" className="fw-medium">
              {productDetail?.title}
            </Typography>
            <Typography variant="body1" className="fw-medium mt-3 lh-lg">
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
