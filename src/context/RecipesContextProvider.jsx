import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../services/api';

// ✅ أنشئ السياق باسم كبير
export const RecipesContext = createContext();

const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <RecipesContext.Provider value={{ recipes, loading, error }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
