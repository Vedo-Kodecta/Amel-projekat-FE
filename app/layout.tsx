"use client";
import React from "react";
import { ProductProvider } from "./context/Product/ProductContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ProductProvider>
      <div>
        <body>{children}</body>
      </div>
    </ProductProvider>
  );
};

export default Layout;
