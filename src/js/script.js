import * as model from "./model/recipe.js";
import recipe from "./view/recipeView.js";
import recipeResults from "./view/resultView.js";
import paginationView from "./view/paginationView.js";

async function controlRecipeResults() {
  try {
    // Access the searched value
    const query = recipeResults.getQuery();
    if (!query) {
      throw new Error("Unable to fetch query");
    }

    recipeResults.renderSpinner();
    // Fetching searched related recipes
    await model.fetchSearchResults(query);
    recipeResults.render(model.state.results, model.state.page);
    recipeResults.paginationHandler(model.state.page);
  } catch (error) {
    recipeResults.renderError();
  }
}

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      throw new Error("Couldn't fetch id from URL");
    }
    recipe.renderSpinner();
    await model.fetchRecipe(id);
    recipe.render(model.state.recipe);
  } catch (error) {
    recipe.renderError();
  }
}

function init() {
  recipeResults.addHandler(controlRecipeResults);
  recipe.addHandler(controlRecipe);
}

init();
// if (module.hot) {
//   module.hot.accept();
// }
