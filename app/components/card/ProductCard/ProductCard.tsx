import React from "react";
import styles from "./ProductCard.module.scss";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const variants = product.variants ?? [];
  let minPrice = null;
  let maxPrice = null;

  if (variants.length > 0) {
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
            {minPrice && maxPrice ? (
              <p>
                Price Range: ${minPrice} - ${maxPrice}
              </p>
            ) : (
              <p>There are no variants, please add them</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
