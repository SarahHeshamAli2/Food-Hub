import { useNavigate } from 'react-router-dom';
import styles from '../../pages/RecipesList/recipesList.module.css';

const RecipeMenu = ({ recipeId, onDelete, closeMenu}) => {
    const navigate= useNavigate()
    const handleDelete = () => {
        closeMenu();
        onDelete && onDelete(recipeId);
    }

    const handleUpdate = () => {
        navigate(`/add-recipe/${recipeId}`)
        closeMenu();
    }
    return (
        <div >
            <div className={`${styles.contextMenu} flex flex-col `}>
                <button onClick={handleDelete} className={styles.contextMenuItem}>Delete</button>
                <button onClick={handleUpdate} className={styles.contextMenuItem}>Update</button>
            </div>
        </div>
    );
}

export default RecipeMenu;
