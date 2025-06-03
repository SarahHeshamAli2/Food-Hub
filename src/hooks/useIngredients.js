import { useState } from "react";

export function useIngredients() {
  const [ingredients, setIngredientsState] = useState([]);

  const addIngredient = () => {
    setIngredientsState([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredientsState(newIngredients);
  };

  const handleInputChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredientsState(newIngredients);
  };

  const setIngredients = (newList) => {
    setIngredientsState(newList);
  };

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    handleInputChange,
    setIngredients, 
  };
}
