import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, Recipe } from "../services/api";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { RecipesContext } from "../context/RecipesContextProvider";
import { v4 as uuidv4 } from "uuid"; 

export default function useSubmitRecipe(recipes, image, setRecipes) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { user } = useUser();
  const { setPendingRecipe, getPendingRecipe } = useContext(RecipesContext);

  const submitRecipe = async (data, ingredients, id = null) => {
    const cleanedIngredients = ingredients.filter((ing) => ing.trim());

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const payload = {
      id: id || uuidv4(), 
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
              setLoading(true)

      if (id) {
        const res = await axios.patch(
          `${BASE_URL}${Recipe.GET_ALL}/${id}`,
          payload
        );
        const updatedRecipe = res?.data;

        setRecipes((prev) =>
          prev.map((r) => (r.id === id ? updatedRecipe : r))
        );
        toast.success("Recipe updated!");
        navigate("/recipes");
      } else {
        const res = await axios.post(`${BASE_URL}/pendingRecipes`, payload);
          setLoading(true)
        setPendingRecipe?.((prev) => [...prev, res.data]);
        setRecipes((prev) => prev.filter((r) => r.id !== res.data.id));

        await getPendingRecipe();

        navigate("/pending-request");
        toast.success("Recipe submitted!");
      }
    } catch (err) {
      alert("Failed to submit recipe for approval.");
      console.error(err);
    }
    finally{
            setLoading(false)

    }
  };

  return {submitRecipe,loading};
}
