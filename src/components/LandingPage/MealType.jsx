import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import RecipeCard from './RecipeCard';
import Marquee from 'react-fast-marquee'; // ✅ use this instead of react-slick

const Section = ({ title, recipes }) => {
  const CARD_WIDTH=390
  return (
  <section className="mb-10 px-6 sm:px-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>

    <div
      style={{
        width: CARD_WIDTH * 3, 
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <Marquee
        speed={100}
        pauseOnHover={true}
        gradient={false}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ width: CARD_WIDTH, flex: '0 0 auto', padding: '0 8px' }}
          >
            <RecipeCard
              id={recipe.id}
              image={recipe.image}
              title={recipe.name}
              author="Chef Ahmed"
              calories={recipe.caloriesPerServing}
            />
          </div>
        ))}
      </Marquee>
    </div>
  </section>
  );
};

export default function MealType() {
  const { recipes, loading, error } = useContext(RecipesContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const breakfast = recipes.filter(r => r.mealType?.includes('Breakfast'));
  const lunch = recipes.filter(r => r.mealType?.includes('Lunch'));
  const dinner = recipes.filter(r => r.mealType?.includes('Dinner'));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Section title="🍳 Breakfast Recipes" recipes={breakfast} />
      <Section title="🥗 Lunch Recipes" recipes={lunch} />
      <Section title="🍝 Dinner Recipes" recipes={dinner} />
    </main>
  );
}
