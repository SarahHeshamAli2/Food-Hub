import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite, BASE_URL } from '../../services/api';
import styles from './recipesList.module.css';
import RecipesListView from './RecipesListView';

export default function RecipesList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/recipes`);
      const allRecipes = await res.json();
      setRecipes(allRecipes);
      if (isLoaded && isSignedIn) {
        const favIds = await getFavorites(user.id);
        setFavoriteIds(favIds);
      }
      setLoading(false);
    }
    fetchData();
  }, [isLoaded, isSignedIn, user]);

  const handleToggleFavorite = async (recipeId) => {
    if (!isSignedIn) return;
    if (favoriteIds.includes(recipeId)) {
      await removeFavorite(user.id, recipeId);
      setFavoriteIds(favoriteIds.filter(id => id !== recipeId));
    } else {
      await addFavorite(user.id, recipeId);
      setFavoriteIds([...favoriteIds, recipeId]);
    }
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
      favoriteIds={favoriteIds}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
