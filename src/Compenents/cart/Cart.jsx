import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography } from "@mui/material";
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

const Cart = (props) => {
  const { open, toggleDrawer } = props;

  const { item } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const totalPrice = item?.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: 350,
              md: 550,

            },
          }}
          role="presentation"
        >
          <Box className="d-flex align-items-center gap-3 mb-3 border-bottom py-2 mx-4">
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
                <Typography variant="h4" color="textPrimary">
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
                  <Box className="mx-4 border-bottom py-2 my-1 d-flex justify-content-between align-items-center">
                    <Box className="d-flex align-items-center gap-2">
                      <img
                        src={item?.image}
                        width="80px"
                        className=" p-2"
                        alt=""
                      />
                      <Box>
                        <Typography variant="h6">
                          {item?.title?.length >= 12
                            ? `${item?.title.slice(0, 12)}...`
                            : item?.title}
                        </Typography>
                        <Typography variant="body2">
                          {item?.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography>$ {item?.price}</Typography>
                    <ButtonGroup
                      variant="outlined"
                      size="small"
                      color="inherit"
                      aria-label="Basic button group"
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

                    <DeleteOutlineIcon
                      onClick={() => dispatch(removeItem(item))}
                      color="error"
                    />
                  </Box>

                  <Box
                    sx={{ width: 550 }}
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
