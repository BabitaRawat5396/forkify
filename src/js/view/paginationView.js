import view from "./view.js";

class PaginationView extends view {
  _parentElement = document.querySelector(".recipe-search-results");
  _forwardBtn;
  _backwardBtn;

  _generateMarkup(page) {
    return `
    <div class="pagination-section">
        <div data-goto="${
          page - 1
        }" class="pagination pagination-backward">&larr; Page ${
      page - 1 ? page - 1 : ""
    }</div>
        <div data-goto="${
          page + 1
        }" class="pagination pagination-forward">Page ${page + 1} &rarr;</div>
    </div>
    `;
  }

  _getTotalPages(recipes) {
    return Math.ceil(recipes.results.length / recipes.resultsPerPage);
  }

  render(recipes) {
    const totalPages = this._getTotalPages(recipes);

    const paginationElement = this._generateMarkup(recipes.page);
    this._parentElement.insertAdjacentHTML("beforeend", paginationElement);
    this._forwardBtn = document.querySelector(".pagination-forward");
    this._backwardBtn = document.querySelector(".pagination-backward");

    
    if (recipes.page < totalPages) {
      this._backwardBtn.style.opacity = 0;
      this._backwardBtn.style.pointerEvents = "none";
    }
    if (recipes.page < totalPages && recipes.page > 1) {
      document.querySelector(".pagination-backward").style.opacity = 1;
      document.querySelector(".pagination-backward").style.pointerEvents =
        "auto";
      document.querySelector(".pagination-forward").style.pointerEvents =
        "auto";
    }
    if (recipes.page === totalPages) {
      document.querySelector(".pagination-forward").style.opacity = 0;
      document.querySelector(".pagination-forward").style.pointerEvents =
        "none";
    }
  }

  paginationHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
