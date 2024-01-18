import icons from "../../img/icons.svg";

export default class View {
  _data = [];

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    const markup = `
      <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
