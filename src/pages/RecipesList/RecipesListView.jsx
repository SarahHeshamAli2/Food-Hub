import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './recipesList.module.css';
import { useNavigate } from 'react-router-dom';
import RecipeMenu from '../../components/Recipe Menu/RecipeMenu';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import { FaSearch } from 'react-icons/fa';



RecipesListView.propTypes = {
  recipes: PropTypes.array.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isRegularUser: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  favoriteIds: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  userId: PropTypes.string,
};

export default function RecipesListView({
  recipes,
  isSignedIn,
  isRegularUser,
  isAdmin,
  favoriteIds,
  onToggleFavorite,
  onDelete,
  onUpdate,
  userId,
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (id, e) => {
    const isActionClick = e.target.closest(`.${styles.actionsContainer}`);
    if (!isActionClick) {
      navigate(`/recipes/${id}`);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore Recipes</h2>

     
<div className="flex justify-center mb-6">
  <div className="relative w-full max-w-md">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaSearch />
    </span>
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F50] focus:border-transparent transition-all duration-300"
    />
    {searchTerm && filteredRecipes.length > 0 && (
  <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 overflow-hidden">
    {filteredRecipes.slice(0, 4).map((recipe) => (
     <li
  key={recipe.id}
  className="px-4 py-2 text-gray-700 hover:bg-orange-200 hover:text-black-800 transition-colors duration-150 cursor-pointer"
  onClick={() => navigate(`/recipes/${recipe.id}`)}
>
  {recipe.name}
</li>
    ))}
  </ul>
)}


  </div>
</div>

      {filteredRecipes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="far fa-utensils"></i>
          </div>
          <h3>No recipes found</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {filteredRecipes.slice(0, visibleCount).map((recipe) => (
              <li
                key={recipe.id}
                className={styles.item}
                onClick={(e) => handleCardClick(recipe.id, e)}
              >
                <IngredientCard recipe={recipe} />

                <div
                  className={styles.actionsContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!isAdmin && isSignedIn && (
                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      className={`${styles.favoriteBtn} ${
                        favoriteIds.includes(recipe.id) ? '' : styles.notFavorited
                      }`}
                      aria-label={
                        favoriteIds.includes(recipe.id)
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                    >
                      <i
                        className={
                          favoriteIds.includes(recipe.id)
                            ? 'fas fa-heart'
                            : 'far fa-heart'
                        }
                      ></i>
                    </button>
                  )}

                  {(isAdmin || (isRegularUser && recipe.userId === userId)) && (
                    <>
                      <button
                        className={styles.menuBtn}
                        onClick={() => toggleMenu(recipe.id)}
                        aria-expanded={menuOpenId === recipe.id}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>

                      {menuOpenId === recipe.id && (
                        <RecipeMenu
                          recipeId={recipe.id}
                          onDelete={onDelete}
                          onUpdate={onUpdate}
                          closeMenu={() => setMenuOpenId(null)}
                        />
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {filteredRecipes.length > visibleCount && (
            <button
              className={styles.seeMoreButton}
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + 12, filteredRecipes.length))
              }
            >
              {visibleCount >= filteredRecipes.length ? 'No more recipes' : 'See More'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
