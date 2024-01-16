class View {
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
}
