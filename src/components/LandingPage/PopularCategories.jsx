import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import { motion } from 'framer-motion';

const PopularCategories = () => {
  const { recipes, loading, error } = useContext(RecipesContext);

  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Appetizer',
    'Side Dish', 'Appetizer', 'Snacks', 'Beverage'
  ];

  const getImageForCategory = (category) => {
    const recipe = recipes.find(r => r.mealType?.includes(category));
    return recipe?.image;
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="px-6 py-10">
      <div className="w-full text-center my-4">
        <motion.h2
          className="text-2xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trending Recipes
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {categories.map((cat, index) => (
          <motion.div
            
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <motion.img
              src={getImageForCategory(cat)}
              alt={cat}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mx-auto shadow"
              whileHover={{ scale: 1.1 }}
            />
            <p className="mt-2 font-medium text-gray-800">{cat} recipes</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
