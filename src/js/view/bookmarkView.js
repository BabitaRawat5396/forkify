import preview from "./preview.js";
import view from "./view.js";

class BookmarkView extends view {
  _parentElement = document.querySelector(".bookmark-list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";

  render(data) {
    preview.render(data);
  }

  addShowBookmarkHandler(handler) {
    document
      .querySelector(".header-bookmark")
      .addEventListener("mouseover", handler);
  }

  removeShowBookmarkHandler() {
    this._parentElement.addEventListener("mouseleave", this._clear.bind(this));
  }
}

export default new BookmarkView();
