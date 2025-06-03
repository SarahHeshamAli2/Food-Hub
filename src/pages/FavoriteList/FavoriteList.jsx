import { useEffect, useState, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getFavorites, removeFavorite } from '../../services/api';
import styles from './favoriteList.module.css';
import FavoriteListView from './FavoriteListView';
import { RecipesContext } from '../../context/RecipesContextProvider';

export default function FavoriteList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { recipes, loading } = useContext(RecipesContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (isLoaded && isSignedIn) {
        setFavoritesLoading(true);
        try {
          const ids = await getFavorites(user.id);
          const filtered = recipes.filter(r => ids.includes(r.id));
          setFavoriteRecipes(filtered);
        } finally {
          setFavoritesLoading(false);
        }
      }
    }
    fetchFavorites();
  }, [isLoaded, isSignedIn, user, recipes]);

  if (!isLoaded || loading || favoritesLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <div>You must be signed in to view your favorites.</div>;
  }
  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(user.id, recipeId);

    } catch (error) {
      console.error('Failed to remove favorite', error);
    }
  };

  return <FavoriteListView favoriteRecipes={favoriteRecipes}
    setFavoriteRecipes={setFavoriteRecipes}
    onRemoveFavorite={handleRemoveFavorite} />;
}
