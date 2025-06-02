import PropTypes from 'prop-types';
import styles from './recipesList.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeMenu from '../../components/Recipe Menu/RecipeMenu';
import IngredientCard from '../../components/IngredientCard/IngredientCard';

RecipesListView.propTypes = {
  recipes: PropTypes.array.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isRegularUser: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  favoriteIds: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  userId: PropTypes.string,
};

export default function RecipesListView({
  recipes,
  isSignedIn,
  isRegularUser,
  isAdmin,
  favoriteIds,
  onToggleFavorite,
  onDelete,
  onUpdate,
  userId,
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const navigate = useNavigate();

  const handleCardClick = (id, e) => {
    const isActionClick = e.target.closest(`.${styles.actionsContainer}`);
    if (!isActionClick) {
      navigate(`/recipes/${id}`);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore Recipes</h2>

      {recipes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="far fa-utensils"></i>
          </div>
          <h3>No recipes yet</h3>
          <p>Be the first to add one!</p>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {recipes.slice(0, visibleCount).map((recipe) => (
              <li
                key={recipe.id}
                className={styles.item}
                onClick={(e) => handleCardClick(recipe.id, e)}
              >
                <IngredientCard recipe={recipe} />

                <div
                  className={styles.actionsContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!isAdmin && isSignedIn && (
                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      className={`${styles.favoriteBtn} ${
                        favoriteIds.includes(recipe.id) ? '' : styles.notFavorited
                      }`}
                      aria-label={
                        favoriteIds.includes(recipe.id)
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                    >
                      <i
                        className={
                          favoriteIds.includes(recipe.id)
                            ? 'fas fa-heart'
                            : 'far fa-heart'
                        }
                      ></i>
                    </button>
                  )}

                  {(isAdmin || (isRegularUser && recipe.userId === userId)) && (
                    <>
                      <button
                        className={styles.menuBtn}
                        onClick={() => toggleMenu(recipe.id)}
                        aria-expanded={menuOpenId === recipe.id}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>

                      {menuOpenId === recipe.id && (
                        <RecipeMenu
                          recipeId={recipe.id}
                          onDelete={onDelete}
                          onUpdate={onUpdate}
                          closeMenu={() => setMenuOpenId(null)}
                        />
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

    {recipes.length > 12 && (
  <button
    className={styles.seeMoreButton}
    disabled={visibleCount >= recipes.length}
    onClick={() => setVisibleCount((prev) => Math.min(prev + 12, recipes.length))}
  >
    {visibleCount >= recipes.length ? 'No more recipes' : 'See More'}
  </button>
)}
         
        </>
      )}
    </div>
  );
}
