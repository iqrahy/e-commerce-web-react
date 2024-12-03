import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const useProductDetail = () => {

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

  return {productDetail , isLoader }
}

export default useProductDetail