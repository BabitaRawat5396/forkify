import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";

class Recipe {
  #parentElement = document.querySelector(".recipe-content");
  #data;

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  _recipeTemplate() {
    return `
    <div class="recipe">
        <div class="recipe-heading">
        <img
            class="recipe-image"
            src="${this.#data.image_url}"
            alt=""
        />
        <div class="overlay-image"></div>
        <p class="recipe-title">${this.#data.title}</p>
        </div>
        <div class="recipe-operations-section">
        <div class="recipe-duration">
            <i class="bx bx-time"></i>
            <p><span class="numbers">${
              this.#data.cooking_time
            }</span> MINUTES</p>
        </div>
        <div class="recipe-servings">
            <i class="bx bx-group"></i>
            <p class="servings-no"><span class="numbers">${
              this.#data.servings
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
        ${this._renderIngredients(this.#data.ingredients)}
        </ul>
        </div>

        <div class="recipe-directions">
        <h2 class="recipe-directions-heading">HOW TO COOK IT?</h2>
        <p class="recipe-directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe-publisher">${
              this.#data.publisher
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
    this.#data = recipe;
    const html = this._recipeTemplate();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("beforeend", html);
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

  renderSpinner() {
    const html = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError() {
    const html = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
        </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  addHandler(handler) {
    window.addEventListener("hashchange", handler);
  }
}

export default new Recipe();
