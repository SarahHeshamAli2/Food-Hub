import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { BASE_URL, Recipe } from '../services/api';
export const RecipesContext = createContext();

const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptedRecipe, setAcceptedRecipe] = useState([]);
    const [declinedRecipe, setDeclinedRecipe] = useState([]);


  const getAcceptedRecipes = () => {
    axios
      .get(BASE_URL + Recipe.GET_ACCEPTED_RECIPES)
      .then((res) => {
         setAcceptedRecipe(res.data);
         setLoading(true)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      });
  };
  const getDeclinedRecipes = () => {
    axios
      .get(BASE_URL + Recipe.GET_DECLINED_RECIPES)
      .then((res) => setDeclinedRecipe(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/recipes`)
      .then(res => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, []);
  
  async function deleteRecipe(recipeId) {
        await fetch(`${BASE_URL}/recipes/${recipeId}`, { method: 'DELETE' });
        setRecipes(recipes.filter(r => r.id !== recipeId));
    }

  return (

    <RecipesContext.Provider value={{ recipes, loading, error ,getAcceptedRecipes,acceptedRecipe,getDeclinedRecipes,declinedRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
