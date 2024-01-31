"use client";
import { useProductApi } from "@/app/context/Product/ProductContext";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import VariantCard from "@/app/components/card/VariantCard/VariantCard";

const ProductDetailPage: React.FC<DynamicParams> = (params) => {
  const { getOneProduct } = useProductApi();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneProduct(params.params.productId);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.productDetail}>
      {product && (
        <>
          <h1>{product?.name}</h1>
          <p className={styles.description}>{product.description}</p>
          {product?.variants && product?.variants?.length > 0 && (
            <div className={styles.variants}>
              <h3>Product Variants:</h3>
              <div className={styles.variantList}>
                {product?.variants?.map((variant) => (
                  <VariantCard key={variant.id} variant={variant} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
