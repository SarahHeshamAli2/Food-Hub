import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipeSlice';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const dispatch = useDispatch();
  const { list: recipes, loading, error } = useSelector((state) => state.recipes);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const visibleRecipes = showAll ? recipes : recipes.slice(0, 8);

  return (
    <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="w-full text-center my-4">
        <h2 className="text-2xl font-semibold">Trending Recipes</h2>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#FF7F50] hover:underline"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleRecipes.map((recipe, index) => (
          <RecipeCard
            id={recipe.id}
            image={recipe.image}
            title={recipe.name}
            author="Chef Ahmed"
            calories={recipe.caloriesPerServing}
            delay={index * 0.1}
            key={recipe?.id}
          />
        ))}
      </div>
    </section>
  );
}
