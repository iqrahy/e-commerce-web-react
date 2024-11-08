import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

import { Box, Grid, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";

const Products = () => {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [product, setProduct] = useState([]);

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);

    if (!isExist) {
      setCartList((prev) => [...prev, product]);

      setOpenSuccess(true);
    } else {
      setOpenAlert(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const successHandleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const products = await axios.get("https://fakestoreapi.com/products");
        console.log(products.data, "products");

        setProduct(products.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchedProducts();
  }, []);

  return (
    <>
      {/* already added item snackbar */}
      <Snackbar
        open={openAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Product already in cart"
        action={action}
        ContentProps={{
          sx: {
            background: "#D32F2F",
          },
        }}
      />

      {/* item added successfully snackbar */}

      <Snackbar
        open={openSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        severity="success"
        onClose={successHandleClose}
        ContentProps={{
          sx: {
            background: "green",
          },
        }}
      >
        <Alert
          onClose={successHandleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Item successfully added!
        </Alert>
      </Snackbar>

      <Box sx={{ backgroundColor: "#FAFAFA", height: "88vh" }}>
        <Grid container spacing={3} className="container-fluid d-flex justify-content-center align-items-center mt-4">
          {product?.map((item, index) => {
            return (
                <Grid item xs={12} sm={4} md={3} sx={{minHeight:'300px', maxHeight:'550px'}}>
              <Card key={index}>
                <CardActionArea>
                 <Box className='text-center'>
                 <img className="img-fluid p-4" style={{minHeight:'100px', maxHeight:'190px'}} src={item.image} alt={item?.title} />
                 </Box>
                  <CardContent className="d-flex justify-content-between align-items-center">
                  <Tooltip title={item?.title} placement="top">
                    <Typography gutterBottom variant="h6" component="div">
                      {item?.title?.length >= 22 ? `${item?.title.slice(0, 15)}...` : item?.title }
                    </Typography>
                    </Tooltip>
                    <Typography variant="inherit" component="div">
                      ${item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider sx={{ borderColor: "gray" }} />
                <CardActions>
                  <Box className="d-flex justify-content-between align-items-center w-100 py-1 ">
                    <Tooltip title="Product details">
                    <VisibilityIcon
                      className="fs-1 py-1"
                      sx={{
                        cursor: "pointer",
                        color: "#E53127",
                      }}
                    />
                    </Tooltip>
                   
                    <Tooltip title="Add to cart">
                    <ShoppingCartIcon
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#E53127",
                        color: "#fff",
                      }}
                      className="w-50 fs-1 py-1 rounded-pill"
                      onClick={() => {
                        cartHandler(item);
                      }}
                    />
                     </Tooltip>

                     <Tooltip title="Favorite">
                    <FavoriteBorderIcon
                      className="fs-1 py-1"
                      sx={{
                        cursor: "pointer",
                        color: "#E53127",
                      }}
                    />
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
