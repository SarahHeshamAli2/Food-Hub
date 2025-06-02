import styles from '../../pages/RecipesList/recipesList.module.css';

const RecipeMenu = ({ recipeId, onDelete, onUpdate, closeMenu}) => {
    const handleDelete = () => {
        closeMenu();
        onDelete && onDelete(recipeId);
    }

    const handleUpdate = () => {
        closeMenu();
        onUpdate && onUpdate(recipeId);
    }
    return (
        <div>
            <div className={styles.contextMenu}>
                <button onClick={handleDelete} className={styles.contextMenuItem}>Delete</button>
                <button onClick={handleUpdate} className={styles.contextMenuItem}>Update</button>
            </div>
        </div>
    );
}

export default RecipeMenu;
