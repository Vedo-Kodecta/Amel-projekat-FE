import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const headers = {
  Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
};

export const getAllProducts = async (page: number = 1) => {
  const response = await api.get("/product?include=variants", {
    params: { page },
  });
  return response.data;
};

export const getOneProduct = async (id: number) => {
  const response = await api.get("/product/" + id + "?include=variants");
  return response.data.data;
};

export const createProduct = async (productData: CreateProduct) => {
  const response = await api.post("/product", productData, { headers });
  return response.data;
};
