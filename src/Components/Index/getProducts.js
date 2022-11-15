import axios from "axios";
export const getProducts = async () => {
  const { data } = await axios.get(`http://localhost:5001/products`);
  return await data;
};
