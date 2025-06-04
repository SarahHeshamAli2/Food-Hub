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
  const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

const getNotifications = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/notifications?userId=${userId}`);
    setNotifications(res.data);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
  }
};
const markNotificationsAsRead = async () => {
  try {
    const unread = notifications.filter(n => n.status === "unread");

    await Promise.all(
      unread.map(n =>
        axios.patch(`${BASE_URL}/notifications/${n.id}`, { status: "read" })
      )
    );

    setNotifications(prev =>
      prev.map(n => ({ ...n, status: "read" }))
    );
  } catch (err) {
    console.error("Failed to mark notifications as read:", err);
  }
};

const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setRecipeToDelete(null);
  }

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      setShowModal(false);
      setRecipeToDelete(null);
    }
  };


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
  
async function deleteRecipe(recipeId) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete recipe");
    }

    setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== recipeId));
    toast.success("Recipe has been deleted!");
  } catch (error) {
    console.error("Delete recipe error:", error);
    toast.error("Failed to delete recipe");
  }
}


  return (

    <RecipesContext.Provider value={{     notifications,
      getNotifications,
      markNotificationsAsRead,handleDelete,cancelDelete,confirmDelete,showModal, setRecipes,deleteRecipe,recipes,setDeclinedRecipe,setAcceptedRecipe, getPendingRecipe,loading,pendingRecipe, setPendingRecipe, error ,getAcceptedRecipes,acceptedRecipe,getDeclinedRecipes,declinedRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
