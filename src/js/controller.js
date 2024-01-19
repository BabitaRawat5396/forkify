import paginationView from "./view/paginationView.js";
import bookmarkView from "./view/bookmarkView.js";
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

function controlAddingBookmark(bookmarkedRecipe) {
  const existedBookmark_index = model.state.bookmarks.findIndex(
    (bookmark) => bookmark.id === bookmarkedRecipe.id
  );
  // Removing bookmarked if existed and clicked again
  if (existedBookmark_index >= 0) {
    bookmarkedRecipe.bookmarked = false;
    recipeView.update(model.state.recipe);
    model.state.bookmarks.splice(existedBookmark_index);
    return;
  }
  // if does not exist then adding bookmark
  model.state.bookmarks.push(bookmarkedRecipe);
  recipeView.update(model.state.recipe);
}

function controlShowBookmark() {
  if (model.state.bookmarks.length > 0) {
    bookmarkView.render(model.state.bookmarks);
    return;
  }

  // No Recipes are bookmarked
  bookmarkView.renderError();
}

function init() {
  searchView.addSearchHandler(controlRecipeResults);
  paginationView.paginationHandler(controlPagination);
  recipeView.addHandler(controlRecipe);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddingBookmark);
  bookmarkView.addShowBookmarkHandler(controlShowBookmark);
  bookmarkView.removeShowBookmarkHandler();
}

init();
// if (module.hot) {
//   module.hot.accept();
// }
