import PropTypes from 'prop-types';
import styles from './recipesList.module.css';
import { useState } from 'react';

export default function RecipesListView({ recipes, isSignedIn, isRegularUser,isAdmin, favoriteIds, onToggleFavorite, onDelete, onUpdate ,userId}) {
  const [menuOpenId, setMenuOpenId] = useState(null);

  const handleMenuToggle = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleDelete = (id) => {
    setMenuOpenId(null);
    onDelete && onDelete(id);
  };

  const handleUpdate = (id) => {
    setMenuOpenId(null);
    onUpdate && onUpdate(id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Recipes</h2>
      <ul className={styles.list}>
        {recipes.map(recipe => (
          <li key={recipe.id} className={styles.item}>
         
            <div className={styles.recipeInfo}>
              <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
              <div>
                <h4 className={styles.recipeName}>{recipe.name}</h4>
                <div className={styles.recipeMeta}>{recipe.cuisine} | {recipe.mealType?.join(', ')}</div>
              </div>
            </div>
            {isAdmin && (
              <div className={styles.menuWrapper}>
                <button
                  className={styles.menuBtn}
                  onClick={() => handleMenuToggle(recipe.id)}
                  aria-label="Open admin menu"
                  title="Admin actions"
                >
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                {menuOpenId === recipe.id && (
                  <div className={styles.contextMenu}>
                    <button onClick={() => handleDelete(recipe.id)} className={styles.contextMenuItem}>Delete</button>
                    <button onClick={() => handleUpdate(recipe.id)} className={styles.contextMenuItem}>Update</button>
                  </div>
                )}
              </div>
            )}

{isRegularUser && recipe?.userId === userId && (
  <div className={styles.menuWrapper}>
    <button
      className={styles.menuBtn}
      onClick={() => handleMenuToggle(recipe.id)}
      aria-label="Open admin menu"
      title="Admin actions"
    >
      <i className="fas fa-ellipsis-v"></i>
    </button>
    {menuOpenId === recipe.id && (
      <div className={styles.contextMenu}>
        <button onClick={() => handleDelete(recipe.id)} className={styles.contextMenuItem}>Delete</button>
        <button onClick={() => handleUpdate(recipe.id)} className={styles.contextMenuItem}>Update</button>
      </div>
    )}
  </div>
)}


            
            {!isAdmin && isSignedIn && (
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className={styles.favoriteBtn + ' ' + (favoriteIds.includes(recipe.id) ? styles.favorited : styles.notFavorited)}
                aria-label={favoriteIds.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                title={favoriteIds.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <i className={favoriteIds.includes(recipe.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

RecipesListView.propTypes = {
  recipes: PropTypes.array.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  favoriteIds: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
