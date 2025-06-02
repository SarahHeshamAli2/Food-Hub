import axios from 'axios';
import {  createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../services/api';

export const recipesContext = createContext();

const RecipesContextProvider = ({children}) => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + "/recipes")
            .then(res => setRecipes(res.data))
            .catch(err => console.error("Error fetching recipes:", err))
    }, []);

    async function deleteRecipe(recipeId) {
        await fetch(`${BASE_URL}/recipes/${recipeId}`, { method: 'DELETE' });
        setRecipes(recipes.filter(r => r.id !== recipeId));
    }

    return (
        <recipesContext.Provider value={{recipes, deleteRecipe}}>
            {children}
        </recipesContext.Provider>
    );
}

export default RecipesContextProvider;