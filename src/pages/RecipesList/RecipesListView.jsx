import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './recipesList.module.css';
import { useNavigate } from 'react-router-dom';
import RecipeMenu from '../../components/Recipe Menu/RecipeMenu';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import { FaSearch, FaTimes } from 'react-icons/fa';
import RecipeLoader from '../../components/Loader/RecipeLoader';
import { useIngredientSearch } from '../../hooks/useIngredientSearch';
import { useDebounce } from '../../hooks/useDebounce';



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
  isLoading: PropTypes.bool,
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
  isLoading,
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9); const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { getIngredientSuggestions, getRecipeCountForIngredient, popularIngredients } = useIngredientSearch(recipes);
  const ingredientSuggestions = getIngredientSuggestions(debouncedSearchTerm, 5);

  const handleCardClick = (id, e) => {
    console.log("Clicked target:", e.target);
    const isActionClick = e.target.closest(`.${styles.actionsContainer}`);
    if (!isActionClick) {
      navigate(`/recipes/${id}`);
    }
  };


  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  }; const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const ingredientMatch = recipe.ingredients?.some(ingredient =>
      ingredient.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    return nameMatch || ingredientMatch;
  });

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} dark:text-white`} >Explore Recipes</h2>

      <div className="flex justify-center mb-6">        <div className="relative w-full max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search by recipe name or ingredients..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 50);
          }}
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F50] focus:border-transparent transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FaTimes />
          </button>
        )}
        {showSuggestions && !searchTerm && popularIngredients.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 overflow-hidden">
            <li className="px-4 py-2 text-xs font-semibold text-gray-500 bg-green-50 border-b">
              POPULAR INGREDIENTS
            </li>
            {popularIngredients.slice(0, 5).map((ingredient, index) => {
              const recipeCount = getRecipeCountForIngredient(ingredient);
              return (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onMouseDown={() => {
                    setSearchTerm(ingredient);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">⭐</span>
                      <span className="capitalize">{ingredient}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {recipeCount} recipe{recipeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {showSuggestions && debouncedSearchTerm && filteredRecipes.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-20 overflow-hidden">
            <li className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
              RECIPES ({filteredRecipes.length} found)
            </li>
            {filteredRecipes.slice(0, 3).map((recipe) => {
              const nameMatch = recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
              const matchedIngredient = recipe.ingredients?.find(ingredient =>
                ingredient.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
              );

              return (
                // RECIPES Suggestions
                <li
                  key={recipe.id}
                  className="px-4 py-2 text-gray-700 hover:bg-orange-200 hover:text-black-800 transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onMouseDown={() => {
                    navigate(`/recipes/${recipe.id}`);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="font-medium">{recipe.name}</div>
                  {!nameMatch && matchedIngredient && (
                    <div className="text-sm text-gray-500 mt-1">
                      Contains: <span className="text-orange-600 font-medium">{matchedIngredient}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {showSuggestions && debouncedSearchTerm && debouncedSearchTerm.length >= 2 && ingredientSuggestions.length > 0 && !filteredRecipes.length && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 overflow-hidden">
            <li className="px-4 py-2 text-xs font-semibold text-gray-500 bg-blue-50 border-b">
              SEARCH BY INGREDIENT
            </li>              {ingredientSuggestions.map((ingredient, index) => {
              const recipeCount = getRecipeCountForIngredient(ingredient);
              return (

                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onMouseDown={() => {
                    setSearchTerm(ingredient);
                    setShowSuggestions(false);
                  }}
                >




                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">🥕</span>
                      <span className="capitalize">{ingredient}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {recipeCount} recipe{recipeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      </div>

      {isLoading ? (
        <RecipeLoader />
      ) : (
        <>          {filteredRecipes.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="far fa-utensils"></i>
            </div>
            {searchTerm ? (
              <>
                <h3>No recipes found for "{searchTerm}"</h3>
                <p>Try searching for different recipe names or ingredients.</p>
              </>
            ) : (
              <>
                <h3>No recipes found</h3>
                <p>Try a different search term.</p>
              </>
            )}
          </div>) : (
          <>

            {searchTerm && filteredRecipes.length > 0 && (
              <div className="mb-4 text-center text-gray-600">
                <p className="text-sm">
                  Found <span className="font-semibold text-orange-600">{filteredRecipes.length}</span>
                  {filteredRecipes.length === 1 ? ' recipe' : ' recipes'}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            )}

            {isSignedIn && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate('/add-recipe/new-recipe')}
                  className="bg-[#FF7F50] hover:bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow transition duration-300"
                >
                  + Add New Recipe
                </button>
              </div>
            )}

            <ul className={styles.list}>
              {filteredRecipes.slice(0, visibleCount).map((recipe) => (
                <li
                  key={recipe.id}
                  className={styles.item}
                  onClick={(e) => handleCardClick(recipe.id, e)}
                >
                  <IngredientCard recipe={recipe}>
                    <div
                      className={styles.actionsContainer}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!isAdmin && isSignedIn && (
                        <button
                          onClick={() => onToggleFavorite(recipe.id)}
                          className={`${styles.favoriteBtn} ${favoriteIds.includes(recipe.id) ? '' : styles.notFavorited
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
                  </IngredientCard>
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
        </>
      )}
    </div>



  );
}
