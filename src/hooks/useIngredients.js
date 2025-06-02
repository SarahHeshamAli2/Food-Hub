import { useState } from "react";

export function useIngredients() {
  const [ingredients, setIngredients] = useState([""]);

  const handleInputChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    if (ingredients.length < 6) setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return { ingredients, handleInputChange, addIngredient, removeIngredient };
}
