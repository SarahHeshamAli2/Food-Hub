import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import RecipeCard from './RecipeCard';
import Marquee from 'react-fast-marquee'; 
import styles from './MealType.module.css';

const Section = ({ title, recipes }) => {
  const CARD_WIDTH = 390;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div
        className={styles.carouselWrapper}
        style={{ width: CARD_WIDTH * 3 }}
      >
        <Marquee
          speed={100}
          pauseOnHover={true}
          gradient={false}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={styles.recipeCardContainer}
              style={{ width: CARD_WIDTH }}
            >
              <RecipeCard
                id={recipe.id}
                image={recipe.image}
                title={recipe.name}
                author={recipe?.auther}
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
  const { recipes } = useContext(RecipesContext);

  const breakfast = recipes.filter(r => r.mealType?.includes('Breakfast'));
  const lunch = recipes.filter(r => r.mealType?.includes('Lunch'));
  const dinner = recipes.filter(r => r.mealType?.includes('Dinner'));

  return (
    <main className={`${styles.main} dark:text-white`}>
      <Section title="🍳 Breakfast Recipes" recipes={breakfast} />
      <Section title="🥗 Lunch Recipes" recipes={lunch} />
      <Section title="🍝 Dinner Recipes" recipes={dinner} />
    </main>
  );
}
