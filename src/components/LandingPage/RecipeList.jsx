import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipeSlice";
import RecipeCard from "./RecipeCard";
import styles from "./RecipeList.module.css";

export default function RecipeList() {
  const dispatch = useDispatch();
  const {
    list: recipes,
    loading,
    error,
  } = useSelector((state) => state.recipes);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

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
              id={recipe.id}
              image={recipe.image}
              title={recipe.name}
              author={recipe.auther}
              calories={recipe.caloriesPerServing}
              delay={index * 0.1}
              key={recipe?.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
