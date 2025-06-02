import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipeSlice';
import RecipeCard from './RecipeCard';

const Section = ({ title, recipes }) => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button className="text-[#FF7F50] hover:underline">View more</button>
    </div>
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
      {recipes.map(recipe => (
        <div key={recipe.id} className="min-w-[250px] flex-shrink-0">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  </section>
);

export default function MealType() {
  const dispatch = useDispatch();
  const { list: recipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const breakfast = recipes.filter(r => r.mealType.includes('Breakfast'));
  const lunch = recipes.filter(r => r.mealType.includes('Lunch'));
  const dinner = recipes.filter(r => r.mealType.includes('Dinner'));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="px-4 sm:px-10 py-6">
      <Section title="🍳 Breakfast Recipes" recipes={breakfast} />
      <Section title="🥗 Lunch Recipes" recipes={lunch} />
      <Section title="🍝 Dinner Recipes" recipes={dinner} />
    </main>
  );
}
