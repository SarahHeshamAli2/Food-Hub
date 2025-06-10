import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../components/LandingPage/PopularCategories.css';

const PopularCategories = () => {
  const { recipes, error } = useContext(RecipesContext);

  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Appetizer',
    'Side Dish', 'Snacks', 'Beverage', 'Dessert'
  ];

  const getRecipeForCategory = (category) => {
    return recipes.find(r => r.mealType?.includes(category));
  };

  if (error) return <p className="error-text">{error}</p>;

  return (
    <section className="popular-section dark:bg-gray-900">
      <div className="popular-title-container">
        <motion.h2
          className="popular-title dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Popular Categories 
        </motion.h2>
      </div>

      <div className="popular-grid">
        {categories.map((cat, index) => {
          const recipe = getRecipeForCategory(cat);
          if (!recipe) return null;

          return (
            <Link to={`/recipes/${recipe.id}`} key={index} className="popular-link">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.img
                  src={recipe.image}
                  alt={cat}
                  className="popular-img"
                  whileHover={{ scale: 1.1 }}
                />
                <p className="popular-text dark:text-white">{cat} recipes</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
