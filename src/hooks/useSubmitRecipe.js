import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, Recipe } from "../services/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContextProvider";

export default function useSubmitRecipe(recipes, image,setRecipes) {
  const navigate = useNavigate();
  const { user } = useUser();
  const{setPendingRecipe,getPendingRecipe}=useContext(RecipesContext)

  const submitRecipe = async (data, ingredients, id = null) => {
    const cleanedIngredients = ingredients.filter((ing) => ing.trim());

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const payload = {
      name: data?.name,
      image,
      servings: Number(data.servings),
      prepTimeMinutes: Number(data.prepTime),
      cookTimeMinutes: Number(data.cookTime),
      cuisine: data?.cuisine,
      ingredients: cleanedIngredients,
      instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
      difficulty: "Easy",
      caloriesPerServing: 150,
      tags: ["Tag1", "Tag2"],
      userId: user?.id,
      rating: 4.4,
      reviewCount: 55,
      mealType: ["Main"],
      isCreated: true,
      creator: user?.fullName,
    };

try {
  if (id) {
    await axios.patch(`${BASE_URL}${Recipe.GET_ALL}/${id}`, payload);
    navigate("/recipes");
    toast.success('Recipe updated!');
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...payload } : r))
    );
  } else {
     const res = await axios.post(`${BASE_URL}/pendingRecipes`, payload);
  setPendingRecipe?.((prev) => [...prev, res.data]);
        setRecipes(prev => prev.filter(r => r.id !== res.data.id));

  await getPendingRecipe();

  navigate("/pending-request");
  toast.success("Recipe submitted!");

  }
} catch (err) {
  alert("Failed to submit recipe for approval.");
  console.error(err);
}

  };

  return submitRecipe;
}
