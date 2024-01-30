import styles from "./page.module.scss";
import { useProductApi } from "../context/Product/ProductContext";
import { useEffect, useState } from "react";

const ProductPage: React.FC = () => {
  const { getAllProducts, createProduct } = useProductApi();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/product");
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  console.log("data", data);

  return (
    <div>
      <h1>
        {data.length > 0
          ? data.map((product) => (
              <div key={product.id}>{product.name}</div> // Assuming a "name" property
            ))
          : "No products found"}
      </h1>
      <h1>Test</h1>
    </div>
  );
};

export default ProductPage;
