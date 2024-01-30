import React, { createContext, useContext, ReactNode } from "react";
import { getAllProducts, createProduct } from "./api";

interface ProductContextProps {
  getAllProducts: () => Promise<any[]>;
  createProduct: (productData: any) => Promise<any>;
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
