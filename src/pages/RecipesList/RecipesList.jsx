import { useUser } from '@clerk/clerk-react';
import { useEffect, useState, useContext } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../../services/api';
import RecipesListView from './RecipesListView';
import { RecipesContext } from '../../context/RecipesContextProvider';
import { toast } from 'react-toastify';
import RecipeLoader from '../../components/Loader/RecipeLoader';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

export default function RecipesList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { recipes,handleDelete } = useContext(RecipesContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);


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
  
  
;

  const handleUpdate = (recipeId) => {
    alert('Update recipe ' + recipeId);
  };

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
        isLoading={loading}
      />

<DeleteModal/>
    </>
  );
}
