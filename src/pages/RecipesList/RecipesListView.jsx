import PropTypes from 'prop-types';

import styles from './recipesList.module.css';

export default function RecipesListView({ recipes, isSignedIn, favoriteIds, onToggleFavorite }) {
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
            {isSignedIn && (
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
//just to catch errors lw b3t prop 8alt...
RecipesListView.propTypes = {
  recipes: PropTypes.array.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  favoriteIds: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
