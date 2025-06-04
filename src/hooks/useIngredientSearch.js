import { useMemo } from 'react';

export const useIngredientSearch = (recipes) => {
  const allIngredients = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    
    const ingredientSet = new Set();
    
    recipes.forEach(recipe => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(ingredient => {
          const cleanIngredient = ingredient
            .toLowerCase()
            .replace(/,.*$/, '') 
            .replace(/\d+/g, '')
            .replace(/\b(cup|cups|tablespoon|tablespoons|teaspoon|teaspoons|pound|pounds|oz|ounces|lb|lbs|tbsp|tsp|ml|g|kg|mg)\b/g, '')
            .replace(/\b(sliced|diced|chopped|minced|cubed|grated|fresh|dried|cooked|raw|for serving)\b/g, '')
            .trim();
          
          if (cleanIngredient && cleanIngredient.length > 2) {
            ingredientSet.add(cleanIngredient);
          }
        });
      }
    });
    
    return Array.from(ingredientSet).sort();
  }, [recipes]);

  const popularIngredients = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    
    const ingredientCount = {};
    
    recipes.forEach(recipe => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(ingredient => {
          const cleanIngredient = ingredient
            .toLowerCase()
            .replace(/,.*$/, '')
            .replace(/\d+/g, '')
            .replace(/\b(cup|cups|tablespoon|tablespoons|teaspoon|teaspoons|pound|pounds|oz|ounces|lb|lbs|tbsp|tsp|ml|g|kg|mg)\b/g, '')
            .replace(/\b(sliced|diced|chopped|minced|cubed|grated|fresh|dried|cooked|raw|for serving)\b/g, '')
            .trim();
          
          if (cleanIngredient && cleanIngredient.length > 2) {
            ingredientCount[cleanIngredient] = (ingredientCount[cleanIngredient] || 0) + 1;
          }
        });
      }
    });
    
    return Object.entries(ingredientCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([ingredient]) => ingredient);
  }, [recipes]);

  const getIngredientSuggestions = (searchTerm, limit = 5) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    return allIngredients
      .filter(ingredient => ingredient.includes(searchTerm.toLowerCase()))
      .slice(0, limit);
  };

  const searchRecipesByIngredient = (searchTerm) => {
    if (!searchTerm) return recipes;
    
    return recipes.filter(recipe => {
      if (!recipe.ingredients) return false;
      
      return recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const searchRecipesByMultipleIngredients = (searchTerms) => {
    if (!searchTerms || searchTerms.length === 0) return recipes;
    
    return recipes.filter(recipe => {
      if (!recipe.ingredients) return false;
      
      return searchTerms.every(searchTerm => 
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  };

  const getRecipeCountForIngredient = (ingredient) => {
    return recipes.filter(recipe => 
      recipe.ingredients?.some(ing => 
        ing.toLowerCase().includes(ingredient.toLowerCase())
      )
    ).length;
  };

  return {
    allIngredients,
    popularIngredients,
    getIngredientSuggestions,
    searchRecipesByIngredient,
    searchRecipesByMultipleIngredients,
    getRecipeCountForIngredient
  };
};
