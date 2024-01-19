export default class Preview {
  _generateMarkup(data) {
    const id = window.location.hash.slice(1);

    return `
          <a class="recipe-item ${
            data.id === id ? "recipe-item--active" : ""
          }" href="#${data.id}">
            <img class="recipe-item-image" src="${
              data.image_url
            }" alt="recipe-item-${data.id}" />
            <p class="recipe-item-title">${
              data.title.length < 17
                ? data.title.toUpperCase()
                : data.title.toUpperCase().slice(0, 17) + "..."
            }</p>
            <p class="recipe-item-publisher">${data.publisher.toUpperCase()}</p>
          </a>
        `;
  }

  render(data) {
    this._data = data;
    this._clear();

    this._data.forEach((recipe) => {
      const recipeHtml = this._generateMarkup(recipe);
      this._parentElement.insertAdjacentHTML("beforeend", recipeHtml);
    });
  }
}
