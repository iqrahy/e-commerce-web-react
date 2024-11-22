import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    item: [],
  },

  reducers: {
    addProduct : (state, action)=>{
      console.log(action.payload, 'action');
      
      const {item, toast} = action.payload

      const isExist = state.item.find((i)=> i.id === item.id)
      console.log(isExist, 'isExist');

      if(isExist){
        toast.error("Item already in cart!")
      }else{
        toast.success("Added to cart successfully!")
        state.item.push({...item, quantity : 1})
      
      }
      
    },

    increaseQuantity : (state, action)=>{
      const product = state.item.find((item)=> item?.id === action.payload.id)

      if(product){
        product.quantity +=1
      }
      console.log(product, 'productmatch');
      
    },

    decreaseQuantity : (state, action)=>{
      const product = state.item.find((item)=> item?.id === action.payload.id)

      if(product && product.quantity > 1){
        product.quantity -=1
      }else{
        state.item = state.item.filter((item)=> item?.id !== action.payload.id)
      }
      
    },

    removeItem: (state, action)=>{
      state.item = state.item.filter((item)=> item?.id !== action.payload.id)

    }
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeItem } = productSlice.actions

export default productSlice.reducer
