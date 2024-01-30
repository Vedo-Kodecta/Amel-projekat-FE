import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProducts = async () => {
  const response = await api.get("/product");
  console.log("resp", response);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await api.post("/products", productData);
  return response.data;
};
