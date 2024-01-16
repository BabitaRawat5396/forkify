import { URL_API } from "../config.js";

export const state = {
  results: [],
  recipe: null,
  page: 1,
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
    state.results = data.recipes;
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
