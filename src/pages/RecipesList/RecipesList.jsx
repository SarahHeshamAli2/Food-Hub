import { useUser } from '@clerk/clerk-react';
import { useEffect, useState, useContext } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../../services/api';
import styles from './recipesList.module.css';
import RecipesListView from './RecipesListView';
import { RecipesContext } from '../../context/RecipesContextProvider';
import { toast } from 'react-toastify';

export default function RecipesList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { recipes, deleteRecipe } = useContext(RecipesContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);


  const isAdmin = isSignedIn && user?.id === import.meta.env.VITE_ADMIN_ID;
  const isRegularUser = isSignedIn && !isAdmin;
  const userId = user?.id;



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

      try {
        if (favoriteIds.includes(recipeId)) {
          await removeFavorite(user.id, recipeId);
          setFavoriteIds(favoriteIds.filter(id => id !== recipeId));
          toast.info('Recipe removed from favorites');
        } else {
          await addFavorite(user.id, recipeId);
          setFavoriteIds([...favoriteIds, recipeId]);
          toast.success('Recipe added to favorites');
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.error(error);
      }
  };
  
  const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      setShowModal(false);
      setRecipeToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setRecipeToDelete(null);
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
    <>
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

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this recipe?</p>
            <div className={styles.modalActions}>
              <button onClick={confirmDelete} className={styles.confirmButton}>Yes, Delete</button>
              <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
