"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { useProductApi } from "@/app/context/Product/ProductContext";

const CreateProductPage: React.FC = () => {
  const { createProduct } = useProductApi();
  const [formData, setFormData] = useState<CreateProduct>({
    name: "",
    description: undefined,
    price: undefined,
    product_type_id: undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.product_type_id) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await createProduct(formData);
      console.log("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Product Type ID:
            <input
              type="number"
              name="product_type_id"
              value={formData.product_type_id}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <button type="submit">Create Product</button>
        </form>
      </section>
    </div>
  );
};

export default CreateProductPage;
