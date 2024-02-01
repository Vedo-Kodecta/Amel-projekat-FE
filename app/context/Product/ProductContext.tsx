"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { getAllProducts, createProduct, getOneProduct } from "./api";

interface ProductContextProps {
  getAllProducts: (page: number) => Promise<ApiProductsResponse>;
  createProduct: (productData: any) => Promise<any>;
  getOneProduct: (id: number) => Promise<Product>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        createProduct,
        getOneProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductApi = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductApi must be used within an ProductProvider");
  }
  return context;
};
