import { URL_API, RECIPES_PER_PAGE } from "./config.js";

export const state = {
  recipe: null,
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RECIPES_PER_PAGE,
  },
};

export async function getJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP error! Couldn't fetch data : STATUS : ${response.status}! `
      );
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSearchResults(query) {
  try {
    const data = await getJSON(`${URL_API}?search=${query}`);
    state.search.results = data.recipes;
  } catch (error) {
    throw error;
  }
}

export async function fetchRecipe(recipe_id) {
  try {
    const data = await getJSON(`${URL_API}/${recipe_id}`);
    state.recipe = data.recipe;
  } catch (error) {
    throw error;
  }
}

export const getPaginatedRecipes = function (page = state.search.page) {
  const start = (page - 1) * 10;
  const end = page * 10;
  state.search.page = page;
  return state.search.results.slice(start, end);
};

export const updatedIngredient = function (newServings) {
  const originalServings = state.recipe.servings;
  state.recipe.servings = newServings;
  state.recipe.ingredients.forEach(
    (ing) => (ing.quantity = ing.quantity * (newServings / originalServings))
  );
  return state.recipe;
};
