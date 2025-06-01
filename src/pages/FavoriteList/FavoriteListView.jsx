import PropTypes from 'prop-types';
import styles from './favoriteList.module.css';

export default function FavoriteListView({ recipes }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Favorite Recipes</h2>
      {recipes.length === 0 ? (
        <div className={styles.empty}>No favorites yet.</div>
      ) : (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

//just to catch errors lw b3t prop 8alt...
FavoriteListView.propTypes = {
  recipes: PropTypes.array.isRequired,
};
