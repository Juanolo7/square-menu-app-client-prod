import styles from "../menu.module.css";

export default function Category({ name, items }) {
  return (
    <div>
      <h2 className={styles.categoryTitle}>{name}</h2>

      <div className={styles.itemsGrid}>
        {items.map(item => (
          <div key={item.id} className={styles.itemCard}>

            <div className={styles.itemHeader}>
              <h3 className={styles.itemName}>{item.name}</h3>
              {item.price && (
                <span className={styles.itemPrice}>
                  €{item.price}
                </span>
              )}
            </div>

            {item.description && (
              <p className={styles.itemDescription}>{item.description}</p>
            )}

            {item.ingredients?.length > 0 && (
              <p className={styles.itemAllergens}>
                Allergens: {item.ingredients.join(", ")}
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
