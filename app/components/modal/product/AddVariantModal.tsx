import { useState } from "react";
import styles from "./AddVariantModal.module.scss";
import { addVariant } from "@/app/context/StateMachine/api";

interface AddVariantModalProps {
  productId: number;
  handleCloseModal: () => void;
  addVariant: (id: number, variant: AddVariant) => Promise<any>;
}
const AddVariantModal: React.FC<AddVariantModalProps> = ({
  productId,
  handleCloseModal,
  addVariant,
}) => {
  const [formData, setFormData] = useState<AddVariant>({
    name: "",
    price: undefined,
    value: "",
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

    if (!formData.name || !formData.price || !formData.value) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addVariant(productId, formData);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding variant:", error);
    }
  };
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <section className={styles.content}>
          <h1>Add Variant</h1>
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
              Value:
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            <button type="submit">Add Variant</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddVariantModal;
