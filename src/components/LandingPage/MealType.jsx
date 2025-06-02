import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import RecipeCard from './RecipeCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Section = ({ title, recipes }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="mb-10 px-20 sm:px-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        
      </div>
      <Slider {...settings}>
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="px-2">
            <RecipeCard
              id={recipe.id}
              image={recipe.image}
              title={recipe.name}
              author="Chef Ahmed"
              calories={recipe.caloriesPerServing}
              delay={index * 0.1}
            />
          </div>
        ))}
      </Slider>
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
    <main className="max-w-7xl mx-auto px-4 sm:px-10 py-6">
      <Section title="🍳 Breakfast Recipes" recipes={breakfast} />
      <Section title="🥗 Lunch Recipes" recipes={lunch} />
      <Section title="🍝 Dinner Recipes" recipes={dinner} />
    </main>
  );
}
