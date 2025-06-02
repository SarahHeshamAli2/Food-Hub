import { useUser } from '@clerk/clerk-react';
import { useEffect, useState, useContext } from 'react';
import { getFavorites, addFavorite, removeFavorite, BASE_URL } from '../../services/api';
import styles from './recipesList.module.css';
import RecipesListView from './RecipesListView';
import {recipesContext} from '../../context/RecipesContextProvider';

export default function RecipesList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const {recipes, deleteRecipe} = useContext(recipesContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = isSignedIn && user?.id === import.meta.env.VITE_ADMIN_ID;
const isRegularUser = isSignedIn && !isAdmin;
const userId=user?.id
  
  useEffect(() => {
    async function fetchData() {
      if (isLoaded && isSignedIn) {
        const favIds = await getFavorites(user.id);
        setFavoriteIds(favIds);
      }
      setLoading(false);
    }
    fetchData();
  }, [isLoaded, isSignedIn, user, isAdmin]);

  const handleToggleFavorite = async (recipeId) => {
    if (!isSignedIn || isAdmin) return;
    if (favoriteIds.includes(recipeId)) {
      await removeFavorite(user.id, recipeId);
      setFavoriteIds(favoriteIds.filter(id => id !== recipeId));
    } else {
      await addFavorite(user.id, recipeId);
      setFavoriteIds([...favoriteIds, recipeId]);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    deleteRecipe(recipeId);
  };

  const handleUpdate = (recipeId) => {
    alert('Update recipe ' + recipeId);
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <RecipesListView
      recipes={recipes}
      isSignedIn={isSignedIn}
      isAdmin={isAdmin}
      isRegularUser={isRegularUser}
      favoriteIds={favoriteIds}
      onToggleFavorite={handleToggleFavorite}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      userId={userId}
    />
  );
}
