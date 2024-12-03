import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useCart = () => {

    

    const { item } = useSelector((state) => state.products);
  
    const dispatch = useDispatch();
  
    const totalPrice = item?.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

  return {totalPrice, dispatch, item }
}

export default useCart