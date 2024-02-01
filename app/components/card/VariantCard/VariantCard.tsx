import styles from "./VariantCard.module.scss";

const VariantCard: React.FC<{
  variant: Variant;
  availableFunctions: string[];
}> = ({ variant, availableFunctions }) => {
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
            <button>Remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
