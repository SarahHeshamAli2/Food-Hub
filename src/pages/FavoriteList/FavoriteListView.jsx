import PropTypes from 'prop-types';
import styles from './favoriteList.module.css';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import { FaHeart, FaHeartBroken, FaBookmark } from 'react-icons/fa';

export default function FavoriteListView({ favoriteRecipes, setFavoriteRecipes, onRemoveFavorite }) {
  function handleRemoveFavorite(recipeId) {
    onRemoveFavorite(recipeId);
    const updatedFavorites = favoriteRecipes.filter(r => r.id !== recipeId);
    setFavoriteRecipes(updatedFavorites);
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBookmark className={styles.titleIcon} />
        <h2 className={styles.title}>Crave List</h2>
      </div>
      {favoriteRecipes.length === 0 ? (
        <div className={styles.emptyContainer}>
          <FaHeartBroken className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No favorites yet</p>
          <p className={styles.emptySubtitle}>Save your favorite recipes and they'll appear here</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {favoriteRecipes.map(recipe => (
            <li key={recipe.id} className={styles.item}>
              <IngredientCard recipe={recipe}>
                <button
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  className={styles.favoriteButton}
                  aria-label="Remove from favorites"
                >
                  <FaHeart className={styles.heartIcon} />
                  <span>Remove Favorite</span>
                </button>
              </IngredientCard>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

//just to catch errors lw b3t prop 8alt...
FavoriteListView.propTypes = {
  favoriteRecipes: PropTypes.array.isRequired,
  setFavoriteRecipes: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
