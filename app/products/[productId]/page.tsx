"use client";
import { useProductApi } from "@/app/context/Product/ProductContext";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import VariantCard from "@/app/components/card/VariantCard/VariantCard";
import { useStateMachineApi } from "@/app/context/StateMachine/StateMachineContext";

const ProductDetailPage: React.FC<DynamicParams> = (params) => {
  const { getOneProduct } = useProductApi();
  const { getAvailableFunctions, addVariant, deleteState, activate } =
    useStateMachineApi();
  const [product, setProduct] = useState<Product>();
  const [availableFunctions, setAvailableFunctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getOneProduct(params.params.productId);
        setProduct(product);

        const functions = await getAvailableFunctions(params.params.productId);
        setAvailableFunctions(functions);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleActivate = async () => {
    try {
      await activate(params.params.productId);
      const functions = await getAvailableFunctions(params.params.productId);
      setAvailableFunctions(functions);
    } catch (error) {
      console.error("Error activating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteState(params.params.productId);
      const functions = await getAvailableFunctions(params.params.productId);
      setAvailableFunctions(functions);
    } catch (error) {
      console.error("Error activating product:", error);
    }
  };

  return (
    <div className={styles.productDetail}>
      {product && !loading ? (
        <>
          <div className={styles.titleDescButton}>
            <div className={styles.titleDesc}>
              <h1>{product?.name}</h1>
              <p className={styles.description}>{product.description}</p>
            </div>
            <div className={styles.buttons}>
              {availableFunctions?.map(
                (action: string) =>
                  action !== "removeVariant" && (
                    <button
                      key={action}
                      className={styles[action]}
                      onClick={() => {
                        if (action === "activate") {
                          handleActivate();
                        } else if (action === "addVariant") {
                        } else if (action === "delete") {
                          handleDelete();
                        }
                      }}
                    >
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </button>
                  )
              )}
            </div>
          </div>
          {product?.variants && product?.variants?.length > 0 && (
            <div className={styles.variants}>
              <h3>Product Variants:</h3>
              <div className={styles.variantList}>
                {product?.variants?.map((variant) => (
                  <VariantCard
                    key={variant.id}
                    variant={variant}
                    availableFunctions={availableFunctions}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <h1>Henlo sačekaj pašice</h1>
      )}
    </div>
  );
};

export default ProductDetailPage;
