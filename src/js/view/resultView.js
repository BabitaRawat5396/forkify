import icons from "url:../../img/icons.svg";
import view from "./view.js";

class ResultView extends view {
  _parentElement = document.querySelector(".recipe-search-results");
  _errorMessage = "No recipes found for your query. Please try again!";

  _generateMarkup(recipe) {
    return `
      <a class="recipe-item" href="#${recipe.id}">
        <img class="recipe-item-image" src="${
          recipe.image_url
        }" alt="recipe-item-${recipe.id}" />
        <p class="recipe-item-title">${
          recipe.title.length < 17
            ? recipe.title.toUpperCase()
            : recipe.title.toUpperCase().slice(0, 17) + "..."
        }</p>
        <p class="recipe-item-publisher">${recipe.publisher.toUpperCase()}</p>
      </a>
    `;
  }

  render(recipes) {
    this._data = recipes;
    this._clear();

    this._data.forEach((recipe) => {
      const recipeHtml = this._generateMarkup(recipe);
      this._parentElement.insertAdjacentHTML("beforeend", recipeHtml);
    });
  }
}

export default new ResultView();
