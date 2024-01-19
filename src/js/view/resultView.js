import icons from "url:../../img/icons.svg";
import preview from "./preview.js";
import view from "./view.js";

class ResultView extends view {
  _parentElement = document.querySelector(".recipe-search-results");
  _errorMessage = "No recipes found for your query. Please try again!";

  render(data) {
    preview.render(data);
  }
}

export default new ResultView();
