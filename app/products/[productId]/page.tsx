"use client";
import { useProductApi } from "@/app/context/Product/ProductContext";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import VariantCard from "@/app/components/card/VariantCard/VariantCard";
import { useStateMachineApi } from "@/app/context/StateMachine/StateMachineContext";
import AddVariantModal from "@/app/components/modal/product/AddVariantModal";

const ProductDetailPage: React.FC<DynamicParams> = (params) => {
  const { getOneProduct } = useProductApi();
  const {
    getAvailableFunctions,
    addVariant,
    deleteState,
    activate,
    removeVariant,
  } = useStateMachineApi();
  const [product, setProduct] = useState<Product>();
  const [availableFunctions, setAvailableFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getOneProduct(params.params.productId);
        setProduct(product);
      } catch (error) {
        setLoading(true);
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [isAddVariantModalOpen]);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const functions = await getAvailableFunctions(params.params.productId);
        setAvailableFunctions(functions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching available functions:", error);
      }
    };

    if (product?.variants) {
      fetchFunctions();
    }
  }, [params.params.productId, product?.variants]);

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

  const handleAddVariant = () => {
    setIsAddVariantModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddVariantModalOpen(false);
  };

  const removeVariantFunction = async (variantId: number) => {
    try {
      await removeVariant(params.params.productId, variantId);
      if (product) {
        const updatedVariants = product.variants?.filter(
          (variant) => variant.id !== variantId
        );
        setProduct({
          ...product,
          variants: updatedVariants,
        });
      }
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
                          handleAddVariant();
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
                    productId={params.params.productId}
                    removeVariantFunction={removeVariantFunction}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <h1>Henlo sačekaj pašice</h1>
      )}
      {isAddVariantModalOpen && (
        <AddVariantModal
          productId={params.params.productId}
          handleCloseModal={handleCloseModal}
          addVariant={addVariant}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
