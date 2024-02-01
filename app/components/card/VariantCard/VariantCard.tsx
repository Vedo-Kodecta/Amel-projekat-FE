import styles from "./VariantCard.module.scss";

const VariantCard: React.FC<{
  variant: Variant;
  availableFunctions: string[];
  productId: number;
  removeVariantFunction: (variantId: number) => Promise<void>;
}> = ({ variant, availableFunctions, productId, removeVariantFunction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1>{variant.name}</h1>
        <p>{variant.value}</p>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.priceAndId}>
          <h1>Price: {variant.price}$</h1>
          <p>Variant Id: {variant.id}</p>
        </div>
        <div className={styles.button}>
          {availableFunctions?.includes("removeVariant") && (
            <button
              onClick={() => {
                removeVariantFunction(variant.id);
              }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
