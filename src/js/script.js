const form = document.querySelector(".form");
const recipeSearchResults = document.querySelector(".recipe-search-results");
const recipeContent = document.querySelector(".recipe-content");

let count = 0;
let recipes;
form.addEventListener("submit", submitHandler);

async function submitHandler(e) {
  e.preventDefault();

  // Access the searched value
  var inputValue = e.target.elements.search.value;

  // Fetching searched related recipes
  const searchRelatedRecipes = await fetchData(inputValue);
  recipes = searchRelatedRecipes.recipes;
  renderSearchedResults();
}

async function fetchData(inputValue) {
  try {
    // ignore-prettier
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${inputValue}`
    );
    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error(`Couldn't fetch recipes on search: ${error}`);
  }
}

function renderSearchedResults() {
  recipeSearchResults.innerHTML = "";
  const slicedRecipes = recipes.slice(count, count + 10);

  slicedRecipes.forEach((recipe) => {
    recipeHtml = `
      <a class="recipe-item" href="#${recipe.id}">
        <img class="recipe-item-image" src="${
          recipe.image_url
        }" alt="recipe-item-${recipe.id}" />
        <p class="recipe-item-title">${recipe.title.toUpperCase()}</p>
        <p class="recipe-item-publisher">${recipe.publisher.toUpperCase()}</p>
      </a>
    `;

    recipeSearchResults.insertAdjacentHTML("beforeend", recipeHtml);
  });

  if (recipes.length > 10) {
    const paginationElement = `
      <div class="pagination-section">
        <div class="pagination pagination-backward pagination-hidden">&larr; Page 1 </div>
        <div class="pagination pagination-forward">Page 1 &rarr;</div>
      </div>
    `;
    recipeSearchResults.insertAdjacentHTML("beforeend", paginationElement);
    document
      .querySelector(".pagination-forward")
      .addEventListener("click", function () {
        if (recipes.length - count < 10) return;
        count += 10;
        renderSearchedResults();
      });
  }
  if (count > 9) {
    document.querySelector(".pagination-backward").style.opacity = 1;
    document
      .querySelector(".pagination-backward")
      .addEventListener("click", function () {
        if (count <= 0) return;
        count -= 10;
        renderSearchedResults();
      });
  }
}

function renderRecipe(recipe) {
  const html = `
    <div class="recipe">
      <div class="recipe-heading">
        <img
          class="recipe-image"
          src="${recipe.image_url}"
          alt=""
        />
        <div class="overlay-image"></div>
        <p class="recipe-title">${recipe.title}</p>
      </div>
      <div class="recipe-operations-section">
        <div class="recipe-duration">
          <i class="bx bx-time"></i>
          <p><span class="numbers">${recipe.cooking_time}</span> MINUTES</p>
        </div>
        <div class="recipe-servings">
          <i class="bx bx-group"></i>
          <p class="servings-no"><span class="numbers">${
            recipe.servings
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
        ${recipe.ingredients
          .map((rec) => {
            return `
            <li class="recipe-ingredient">
              <i class='bx bx-badge-check recipe-icon'></i>
              
              <div class="recipe-quantity">${rec.quantity}</div>
              <div class="recipe-description">
                <span class="recipe-unit">${rec.unit}</span>
                ${rec.description}
              </div>
            </li>
          `;
          })
          .join("")}
        </ul>
      </div>

      <div class="recipe-directions">
        <h2 class="recipe-directions-heading">HOW TO COOK IT?</h2>
        <p class="recipe-directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe-publisher">${recipe.publisher}</span>. Please
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
  recipeContent.innerHTML = "";
  recipeContent.insertAdjacentHTML("beforeend", html);
}

window.addEventListener("hashchange", async function (e) {
  const id = window.location.hash.slice(1);
  const recipeContent = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const data = await recipeContent.json();
  renderRecipe(data.data.recipe);
});

if (module.hot) {
  module.hot.accept();
}
