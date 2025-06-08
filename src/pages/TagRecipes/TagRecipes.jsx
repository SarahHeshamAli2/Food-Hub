import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import styles from './TagRecipes.module.css';

const TagRecipes = () => {
  const { tag } = useParams();
  const { recipes } = useContext(RecipesContext);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );

  return (
    <div className={`${styles.containerBox} dark:bg-gray-900`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{tag}</h2>
        <p className={`${styles.subtitle} dark:text-white`}>
          Explore delicious recipes tagged with <span className={`${styles.highlight} dark:text-[#FF7F50]`}>{tag}</span>
        </p>
        <div className={`${styles.underline} `}></div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className={styles.gridLayout} >
          {filteredRecipes.map(recipe => (
            <IngredientCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className={styles.noRecipes}>
          No recipes found with this tag.
        </div>
      )}
    </div>
  );
};

export default TagRecipes;
