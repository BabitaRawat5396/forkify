import icons from "url:../../img/icons.svg";

class RecipeResults {
  #parentElement = document.querySelector(".recipe-search-results");
  #data = [];

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  _recipeItemTemplate(recipe) {
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

  _paginationTemplate(page) {
    return `
      <div class="pagination-section">
        <div class="pagination pagination-backward pagination-hidden">&larr; Page ${
          page - 1 ? page - 1 : ""
        }</div>
        <div class="pagination pagination-forward">Page ${page + 1} &rarr;</div>
      </div>
    `;
  }

  render(recipes, page) {
    this.#data = recipes;
    const start = (page - 1) * 10;
    const end = start + 9;

    const slicedRecipes = this.#data.slice(start, end);
    this.#clear();

    slicedRecipes.forEach((recipe) => {
      const recipeHtml = this._recipeItemTemplate(recipe);
      this.#parentElement.insertAdjacentHTML("beforeend", recipeHtml);
    });

    this.pagination(page);
  }

  pagination(page) {
    if (this.#data.length > 10) {
      const paginationElement = this._paginationTemplate(page);
      this.#parentElement.insertAdjacentHTML("beforeend", paginationElement);
    }
    if (page > 1) {
      document.querySelector(".pagination-backward").style.opacity = 1;
    }

    if (page === Math.ceil(this.#data.length / 10)) {
      document.querySelector(".pagination-forward").style.opacity = 0;
    }
  }

  paginationHandler(page) {
    this.#parentElement.addEventListener(
      "click",
      function (e) {
        const btnForward = e.target.closest(".pagination-forward");
        const btnBackward = e.target.closest(".pagination-backward");

        if (!btnForward && !btnBackward) return;
        if (btnForward) {
          page++;
        }
        if (btnBackward) {
          page--;
        }
        this.render(this.#data, page);
        console.log(page);
      }.bind(this)
    );
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

  getQuery() {
    return document.querySelector(".search-input").value;
  }

  addHandler(handler) {
    document.querySelector(".form").addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new RecipeResults();
