import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/product/",
});

const headers = {
  Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
};

export const getAvailableFunctions = async (id: number) => {
  const response = await api.get(id + "/state-machine/listAvailableFunctions", {
    headers,
  });
  return response.data;
};

export const deleteState = async (id: number) => {
  const response = await api.put(
    id + "/state-machine/delete",
    {},
    {
      headers,
    }
  );
  return response.data;
};

export const removeVariant = async (productId: number, variantId: number) => {
  const response = await api.put(
    productId + "/state-machine/remove-variant/" + variantId,
    {},
    {
      headers,
    }
  );
  return response.data;
};

export const addVariant = async (id: number, variant: AddVariant) => {
  const response = await api.put(id + "/state-machine/add-variant", variant, {
    headers,
  });
  return response.data;
};

export const activate = async (id: number) => {
  const response = await api.put(
    id + "/state-machine/activate",
    {},
    {
      headers,
    }
  );
  return response.data;
};
