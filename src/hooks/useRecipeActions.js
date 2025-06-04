import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RecipesContext } from "../context/RecipesContextProvider";
import { BASE_URL, Recipe } from "../services/api";

export default function useRecipeActions() {
  const { setRecipes, recipes } = useContext(RecipesContext);
  const navigate = useNavigate();

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${Recipe.GET_ALL}/${id}`);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      console.error("Failed to delete recipe", error);
      toast.error("Failed to delete recipe");
    }
  };

  const editRecipe = (recipe) => {
    navigate("/add-recipe", { state: { recipe } });
  };

  return { deleteRecipe, editRecipe };
}
