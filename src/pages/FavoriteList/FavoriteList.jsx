import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getFavorites } from '../../services/api';
import styles from './favoriteList.module.css';
import FavoriteListView from './FavoriteListView';

export default function FavoriteList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (isLoaded && isSignedIn) {
        const ids = await getFavorites(user.id);
        // Fetch all recipes
        const res = await fetch('http://localhost:3001/recipes');
        const allRecipes = await res.json();
        setRecipes(allRecipes.filter(r => ids.includes(r.id)));
        setLoading(false);
      }
    }
    fetchFavorites();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <div>You must be signed in to view your favorites.</div>;
  }

  return <FavoriteListView recipes={recipes} />;
}
