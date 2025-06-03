export const BASE_URL = "http://localhost:3001";

export const Recipe = {
  GET_ALL: "/recipes",
  GET_BY_ID: (id) => `/recipes/${id}`,
  DELETE: (id) => `/recipes/${id}`,
  CREATE: "/recipes",     
  UPDATE: (id) => `/recipes/${id}` ,
  GET_PENDING_RECIPES : '/pendingRecipes',
  GET_ACCEPTED_RECIPES:'/acceptedRecipes',
  GET_DECLINED_RECIPES:'/declinedRecipes'
};

export const Favorites = {
  GET_BY_USER: (userId) => `/favorites?userId=${userId}`,
  ADD_OR_UPDATE: (userId) => `/favorites?userId=${userId}`,
  REMOVE: (userId, recipeId) => `/favorites?userId=${userId}&favoriteRecipeId_like=${recipeId}`,
};
export const Review = {
  ADD_REVIEW :'/reviews',
  GET_ALL : '/reviews'
}

export async function addFavorite(userId, recipeId) {
  const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`);
  const data = await res.json();
  if (data.length === 0) {
    await fetch(`${BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, favoriteRecipeId: [recipeId] })
    });
  } else {
    const fav = data[0];
    if (!fav.favoriteRecipeId.includes(recipeId)) {
      await fetch(`${BASE_URL}/favorites/${fav.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ favoriteRecipeId: [...fav.favoriteRecipeId, recipeId] })
        });
    }
  }
}

export async function removeFavorite(userId, recipeId) {
  const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`);
  const data = await res.json();
  if (data.length > 0) {
    const fav = data[0];
    if (fav.favoriteRecipeId.includes(recipeId)) {
      const updated = fav.favoriteRecipeId.filter(id => id !== recipeId);
      await fetch(`${BASE_URL}/favorites/${fav.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ favoriteRecipeId: updated })
        });
    }
  }
}

export async function getFavorites(userId) {
  const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`);
  const data = await res.json();
  if (data.length > 0) {
    return data[0].favoriteRecipeId;
  }
  return [];
}
