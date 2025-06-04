import { useContext } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import styles from "./DeleteModal.module.css"
export default function DeleteModal() {

  const { showModal,confirmDelete,cancelDelete} = useContext(RecipesContext);

return <>
       {showModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <p>Are you sure you want to delete this recipe?</p>
                  <div className={styles.modalActions}>
                    <button onClick={confirmDelete} className={styles.confirmButton}>Yes, Delete</button>
                    <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
</>
}
