"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { useProductApi } from "../context/Product/ProductContext";
import ProductCard from "../components/card/ProductCard/ProductCard";
import debounce from "lodash.debounce";

const ProductPage: React.FC = () => {
  const { getAllProducts, createProduct } = useProductApi();
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    priceGT: "",
    priceLTE: "",
    valid_from: "",
    valid_to: "",
  });
  const [query, setQuery] = useState<string | undefined>('');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  const debouncedFetchData = debounce(async () => {
    try {
      const response = await getAllProducts(1, query);
      setData(response.data);
      setLastPage(response.meta.last_page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, 500);

  useEffect(() => {
    debouncedFetchData();

    return () => debouncedFetchData.cancel();
  }, [query]);

  const handlePageChange = async (newPage: number) => {
    try {
      const response = await getAllProducts(newPage, query);
      setData(response.data);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });

    setParamValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: value,
      };

      const newQuery = Object.keys(updatedValues)
        .map((param) => `${param}=${encodeURIComponent(updatedValues[param])}`)
        .join("&");

      setQuery(newQuery);

      return updatedValues;
    });
  };

  console.log(query);

  return (
    <div className={styles.container}>
      <div className={styles.filterInputs}>
        <div className={styles.filterInput}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.twinInputs}>
          <div className={styles.filterInput}>
            <label htmlFor="priceGT" className={styles.label}>
              Price Greater Than:
            </label>
            <input
              type="number"
              name="priceGT"
              placeholder="Price Greater Than"
              value={filters.priceGT}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.filterInput}>
            <label htmlFor="priceLTE" className={styles.label}>
              Price Less Than or Equal:
            </label>
            <input
              type="number"
              name="priceLTE"
              placeholder="Price Less Than or Equal"
              value={filters.priceLTE}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.twinInputs}>
          <div className={styles.filterInput}>
            <label htmlFor="valid_from" className={styles.label}>
              Valid From:
            </label>
            <input
              type="date"
              name="valid_from"
              placeholder="Valid From"
              value={filters.valid_from}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.filterInput}>
            <label htmlFor="valid_to" className={styles.label}>
              Valid To:
            </label>
            <input
              type="date"
              name="valid_to"
              placeholder="Valid To"
              value={filters.valid_to}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
      </div>
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
