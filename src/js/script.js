const form = document.querySelector(".form");
const recipeSearchResults = document.querySelector(".recipe-search-results");
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
      <div class="recipe-item" id="${recipe.id}">
        <img class="recipe-item-image" src="${
          recipe.image_url
        }" alt="recipe-item-${recipe.id}" />
        <p class="recipe-item-title">${recipe.title.toUpperCase()}</p>
        <p class="recipe-item-publisher">${recipe.publisher.toUpperCase()}</p>
      </div>
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

recipeSearchResults.addEventListener("click", async function (e) {
  const recipe = e.target.closest(".recipe-item");
  console.log(recipe.id);

  const recipeContent = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}`
  );
  const data = await recipeContent.json();
  console.log(data.data.recipe);
});


function renderRecipe(recipe){

}
