import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { BASE_URL, Recipe } from '../services/api';
import { toast } from 'react-toastify';
export const RecipesContext = createContext();

const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptedRecipe, setAcceptedRecipe] = useState([]);
    const [declinedRecipe, setDeclinedRecipe] = useState([]);
      const [pendingRecipe, setPendingRecipe] = useState([]);


const getPendingRecipe = async () => {
    const res = await axios.get(BASE_URL + Recipe.GET_PENDING_RECIPES);
    setPendingRecipe(res.data);
  };
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
  
   function deleteRecipe(recipeId) {
    try {
               fetch(`${BASE_URL}/recipes/${recipeId}`, { method: 'DELETE' }).then(res=>{
 setRecipes(recipes.filter(r => r.id !== recipeId));
 toast.success('recipe has been deleted !')
               });

    } catch (error) {
      console.log(error);
      
      
    }
    
       
    }

  return (

    <RecipesContext.Provider value={{ setRecipes,deleteRecipe,recipes,setDeclinedRecipe,setAcceptedRecipe, getPendingRecipe,loading,pendingRecipe, setPendingRecipe, error ,getAcceptedRecipes,acceptedRecipe,getDeclinedRecipes,declinedRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
