import paginationView from "./view/paginationView.js";
import resultView from "./view/resultView.js";
import searchView from "./view/searchView.js";
import recipeView from "./view/recipeView.js";
import * as model from "./model.js";

async function controlRecipeResults() {
  try {
    // Access the searched value
    const query = searchView.getQuery();
    if (!query) {
      throw new Error("Unable to fetch query");
    }

    resultView.renderSpinner();
    // Fetching searched related recipeViews
    await model.fetchSearchResults(query);
    resultView.render(model.getPaginatedRecipes());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultView.renderError();
  }
}

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    await model.fetchRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

function controlPagination(pageToGo) {
  resultView.render(model.getPaginatedRecipes(pageToGo));
  paginationView.render(model.state.search);
}

function controlServings(servings) {
  recipeView.update(model.updatedIngredient(servings));
}

function init() {
  searchView.addSearchHandler(controlRecipeResults);
  paginationView.paginationHandler(controlPagination);
  recipeView.addHandler(controlRecipe);
  recipeView.addUpdateServingsHandler(controlServings);
}

init();
// if (module.hot) {
//   module.hot.accept();
// }
