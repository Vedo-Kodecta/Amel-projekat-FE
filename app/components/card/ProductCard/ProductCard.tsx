import React from "react";
import styles from "./ProductCard.module.scss";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const variants = product.variants;
  let minPrice = 0;
  let maxPrice = 0;
  // Find the smallest and largest prices
  if (variants) {
    minPrice = Math.min(...variants.map((variant) => variant.price));
    maxPrice = Math.max(...variants.map((variant) => variant.price));
  }

  return (
    <div className={styles.cardWrapper}>
      <Link href={"products/" + product.id}>
        <div className={styles.container}>
          <div className={styles.image}>Kofol ovde ide slika</div>
          <div className={styles.textContainer}>
            <div className={styles.textDesc}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <p>
              Price Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
