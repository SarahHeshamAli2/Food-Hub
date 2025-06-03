// features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './../services/api';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const res = await fetch(`${BASE_URL}/recipes`);
  const data = await res.json();
  return data;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
