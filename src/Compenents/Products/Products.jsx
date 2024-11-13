import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Products = () => {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState({});

  const navigate = useNavigate();

  const cartHandler = (product) => {
    const isExist = cartList?.find((cart) => cart?.id === product?.id);

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
        setIsLoader(true);
        const products = await axios.get("https://fakestoreapi.com/products");

        if (products.status === 200) {
          setIsLoader(false);
          setProduct(products?.data);
          setAllProducts(products?.data);

          const filteredCategories = products?.data?.map((item) => {
            return {
              label:
                item?.category?.charAt(0).toUpperCase() +
                item?.category?.slice(1),
              value: item?.category,
            };
          });

          const updatedCategory = filteredCategories.filter(
            (item, index, self) =>
              index === self?.findIndex((i) => i.value === item.value)
          );

          setCategoryOption(updatedCategory);
        } else {
          setIsLoader(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchedProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts?.filter(
      (p) => p?.category === filteredCategories?.value
    );
    setProduct(filteredProducts);
    console.log(filteredProducts, "filteredProducts");
  }, [filteredCategories]);

  return (
    <>
      <Box className="d-flex justify-content-end me-3 me-md-5 mt-4">
        <Autocomplete
          disablePortal
          size="small"
          options={categoryOption}
          onChange={(_, value) => {
            setFilteredCategories(value);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>

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

      <Box>
        {isLoader ? (
          <Box className="text-center mt-5 pt-5">
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Grid
            container
            className="container-fluid d-flex justify-content-center mx-auto align-items-center mt-4"
          >
            {product?.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={4}
                  lg={3}
                  mb={3}
                  sx={{ minHeight: "300px", maxHeight: "600px" }}
                >
                  <Card key={index} sx={{ width: "305px", minWidth: "180px" }}>
                    <CardActionArea>
                      <Box className="text-center">
                        <img
                          className="img-fluid p-4"
                          style={{ minHeight: "150px", maxHeight: "200px" }}
                          src={item.image}
                          alt={item?.title}
                        />
                      </Box>
                      <CardContent className="d-flex justify-content-between align-items-center">
                        <Tooltip title={item?.title} placement="top">
                          <Typography gutterBottom variant="h6" component="div">
                            {item?.title?.length >= 22
                              ? `${item?.title.slice(0, 15)}...`
                              : item?.title}
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
                        <Tooltip title=" View details">
                          <VisibilityIcon
                            onClick={() => {
                              navigate(`/product-details/${item?.id}`);
                            }}
                            className="fs-1 p-2 btn btn-light rounded-circle"
                            sx={{
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Add to cart">
                          <ShoppingCartIcon
                            sx={{
                              cursor: "pointer",
                            }}
                            className="fs-1 py-1 w-50 rounded-pill btn btn-outline-danger"
                            onClick={() => {
                              cartHandler(item);
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Favorite">
                          <FavoriteBorderIcon
                            className="fs-1 p-2 btn btn-light rounded-circle"
                            sx={{
                              cursor: "pointer",
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
        )}
      </Box>
    </>
  );
};

export default Products;
