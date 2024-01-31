"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { useProductApi } from "../context/Product/ProductContext";
import ProductCard from "../components/card/ProductCard/ProductCard";

const ProductPage: React.FC = () => {
  const { getAllProducts, createProduct } = useProductApi();
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts(1);
        setData(response.data);
        setLastPage(response.meta.last_page);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = async (newPage: number) => {
    try {
      const response = await getAllProducts(newPage);
      setData(response.data);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.paginationButtons}>
        {Array.from({ length: lastPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
