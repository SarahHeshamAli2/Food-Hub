
import { useContext, useState } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import RecipeCard from "../LandingPage/RecipeCard";
import styles from "./RecipeList.module.css";

export default function RecipeList() {
  const {
    recipes,
    loading,
    error,
  } = useContext(RecipesContext);

  const [showAll, setShowAll] = useState(false);

  const visibleRecipes = showAll ? recipes : recipes.slice(0, 9);

  return (
    <section className={styles.section}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Trending Recipes</h2>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={() => setShowAll(!showAll)}
          className={styles.toggleButton}
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {visibleRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              title={recipe.name}
              author={recipe.auther}
              calories={recipe.caloriesPerServing}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

