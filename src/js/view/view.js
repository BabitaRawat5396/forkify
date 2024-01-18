import icons from "../../img/icons.svg";

export default class View {
  _data = [];

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update(data) {
    this._data = data;
    const updatedMarkup = this._generateMarkup();
    // Create a new HTML document using DOMParser
    const virtualDOM = document
      .createRange()
      .createContextualFragment(updatedMarkup);
    const virtualDOMElements = Array.from(virtualDOM.querySelectorAll("*"));
    const currentDOMElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    virtualDOMElements.forEach((newEl, idx) => {
      const curEl = currentDOMElements[idx];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== "" &&
        curEl
      ) {
        // console.log(curEl.firstChild);
        // console.log(newEl.firstChild);

        // curElements which content you want to update depend on the html structure you are using
        curEl.firstChild.textContent = newEl.firstChild.textContent;
        // console.log("curr : ", curEl);
        // console.log("virtual", newEl);
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
