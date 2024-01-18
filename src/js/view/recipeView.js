import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";
import view from "./view.js";

class RecipeView extends view {
  _parentElement = document.querySelector(".recipe-content");
  _errorMessage = "";

  _generateMarkup() {
    return `
    <div class="recipe">
        <div class="recipe-heading">
        <img
            class="recipe-image"
            src="${this._data.image_url}"
            alt=""
        />
        <div class="overlay-image"></div>
        <p class="recipe-title">${this._data.title}</p>
        </div>
        <div class="recipe-operations-section">
        <div class="recipe-duration">
            <i class="bx bx-time"></i>
            <p><span class="numbers">${
              this._data.cooking_time
            }</span> MINUTES</p>
        </div>
        <div class="recipe-servings">
            <i class="bx bx-group"></i>
            <p class="servings-no"><span class="numbers">${
              this._data.servings
            }</span> SERVINGS</p>
            <div class="servings-no-icons">
            <i class="bx bx-minus-circle"></i>
            <i class="bx bx-plus-circle"></i>
            </div>
        </div>
        <p class="recipe-bookmark"><i class="bx bx-bookmark"></i></p>
        </div>
        <div class="recipe-ingredient-section">
        <h3 class="ingredients-header">RECIPE INGREDIENTS</h3>
        <ul class="recipe-ingredient-list">
        ${this._renderIngredients(this._data.ingredients)}
        </ul>
        </div>

        <div class="recipe-directions">
        <h2 class="recipe-directions-heading">HOW TO COOK IT?</h2>
        <p class="recipe-directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe-publisher">${
              this._data.publisher
            }</span>. Please
            check out directions at their website.
        </p>
        <a
            class="btn--small recipe-btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
        >
            <span>Directions</span>
            <svg class="search-icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </a>
        </div>
    </div>
    `;
  }

  render(recipe) {
    this._data = recipe;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  _renderIngredients(ingredients) {
    return ingredients
      .map((rec) => {
        return `
        <li class="recipe-ingredient">
            <i class='bx bx-badge-check recipe-icon'></i>
            <div class="recipe-quantity">${
              rec.quantity ? new Fraction(rec.quantity).toString() : ""
            }</div>
            <div class="recipe-description">
            <span class="recipe-unit">${rec.unit}</span>
            ${rec.description}
            </div>
        </li>
        `;
      })
      .join("");
  }

  renderInitialMessage() {
    const markup = `
      <div class="no-recipe-message">
        &#128516; Start by searching for a recipe or an ingredient. Have fun!
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandler(handler) {
    window.addEventListener("hashchange", handler);
  }
}

export default new RecipeView();
