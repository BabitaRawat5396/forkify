import view from "./view.js";

class SearchView extends view {
  _parentElement = document.querySelector(".form");

  #clearInput() {
    this._parentElement.querySelector(".search-input").value = "";
  }

  getQuery() {
    const query = this._parentElement.querySelector(".search-input").value;
    this.#clearInput();
    return query;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
