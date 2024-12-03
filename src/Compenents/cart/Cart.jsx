import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, ButtonGroup, Grid, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../slices/products/productSlice";
import CartImg from "../accets/cart.jpg";
import useCart from "./useCart";

const Cart = (props) => {
  const { open, toggleDrawer } = props;

  const { totalPrice, dispatch, item } = useCart();

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: {
              xs: 330,
              sm: 400,
              md: 550,
            },
          }}
          role="presentation"
        >
          <Box className="d-flex align-items-center gap-3 mb-3 border-bottom py-2 px-4">
            <KeyboardBackspaceIcon
              sx={{ cursor: "pointer" }}
              onClick={toggleDrawer(false)}
            />
            <Typography variant="h5">My Cart</Typography>
          </Box>
          {item.length === 0 ? (
            <Box>
              <Box className="text-center mt-5">
                <img
                  src={CartImg}
                  className="img-fluid"
                  width={"300px"}
                  alt=""
                />
                <Typography
                  variant="h4"
                  color="textPrimary"
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Oops, Nothing Here Yet!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Let’s get started on your shopping journey.
                </Typography>
              </Box>
            </Box>
          ) : (
            item?.map((item) => {
              return (
                <Box className="w-100 position-relative">
                  <Grid
                    container
                    className="py-2 my-3 d-flex align-items-center border-bottom"
                  >
                    <Grid item xs={3} sm={3} md={2} sx={{ px: 2 }} className="text-center">
                      <img
                        src={item?.image}
                        width="80px"
                        className="p-2"
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={6} sm={5} md={3} sx={{ ps: 1 }} className="ps-3 ps-md-0">
                      <Tooltip title={item?.title} placement="top">
                        <Typography variant="h6">
                          {item?.title?.length >= 12
                            ? `${item?.title.slice(0, 10)}...`
                            : item?.title}
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2">{item?.category}</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={2}>
                      <Typography >$ {item?.price}</Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={3} sx={{ px: 1 }} className="ps-5 ms-5 ps-lg-0 ms-lg-0">
                      <ButtonGroup
                        variant="outlined"
                        size="small"
                        color="inherit"
                        aria-label="Basic button group"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        <Button>
                          <RemoveIcon
                            onClick={() => dispatch(decreaseQuantity(item))}
                          />
                        </Button>
                        <Button>{item?.quantity}</Button>
                        <Button>
                          <AddIcon
                            onClick={() => dispatch(increaseQuantity(item))}
                          />
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={5} sm={5} md={2} sx={{ px: 3 }} className="ps-5 ps-md-3 ps-lg-0">
                      <DeleteOutlineIcon
                        onClick={() => dispatch(removeItem(item))}
                        color="error"
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: {
                        xs: 330,
                        sm: 400,
                        md: 550,
                      },
                    }}
                    className="d-flex justify-content-between align-items-center bg-body-secondary p-3 position-fixed bottom-0"
                  >
                    <Typography variant="h5">Total Price</Typography>
                    <Typography variant="body1">${totalPrice}</Typography>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
