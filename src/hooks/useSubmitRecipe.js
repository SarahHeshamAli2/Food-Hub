import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSubmitRecipe(recipes, image) {
  const navigate = useNavigate();

  const submitRecipe = async (data, ingredients) => {
    const cleanedIngredients = ingredients.filter((ing) => ing.trim());

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const maxId = recipes.reduce((max, recipe) => {
      const idNum = parseInt(recipe.id, 10);
      return idNum > max ? idNum : max;
    }, 0);

    const newId = (maxId + 1).toString();

    const payload = {
      id: newId,
      name: data.name,
      image,
      servings: Number(data.servings),
      prepTimeMinutes: Number(data.prepTime),
      cookTimeMinutes: Number(data.cookTime),
      cuisine: data.cuisine,
      ingredients: cleanedIngredients,
      instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
      difficulty: "Easy",
      caloriesPerServing: 150,
      tags: ["Tag1", "Tag2"],
      userId: 134,
      rating: 4.4,
      reviewCount: 55,
      mealType: ["Main"],
    };

    try {
      await axios.post("http://localhost:3001/pendingRecipes", payload);
      navigate("/pending-request");
    } catch (err) {
      alert("Failed to submit recipe for approval.");
      console.error(err);
    }
  };

  return submitRecipe;
}
