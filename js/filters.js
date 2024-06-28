const recipesData = () =>
  fetch("./data/recipes.json")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });

const generateFilters = async (params) => {
  if (params?.category !== undefined) {
    const resultRecipes = await recipes();

    const filtersDOM = document.querySelector(
      ".filters-container > .filter-group"
    );

    const { category } = params;
    const filteredRecipes = resultRecipes.filter(
      (recipe) => recipe.category.toLowerCase() === category
    );

    // Get all ingredients from the filtered recipes
    const ingredients = filteredRecipes.flatMap(
      (recipe) => recipe.ingredients.flatMap((ingredients) => ingredients.name)
    );

    const uniqueIngredients = [...new Set(ingredients)];

    filtersDOM.innerHTML += uniqueIngredients
      .map((ingredient) => {
        return `
        <button class="filter-button">${ingredient}</button>
      `;
      })
      .join("");
  }
};

const addFilterEventListeners = (params) => {
  const filterButtons = document.querySelectorAll(".filter-button");
  const allButton = document.getElementById("allIngredients");

  // Function to toggle the active class on the clicked button
  function toggleActiveClass(event, params) {

    // If the clicked button is the "All" button, remove active class from all other buttons
    if (event.target.id === "allIngredients") {

      filterButtons.forEach((button) => {
        if (button.id !== "allIngredients") {
          button.classList.remove("active");
        }
      });
    } else {

      if (allButton.classList.contains("active")) {
        allButton.classList.remove("active");
      }
    }

    // Toggle active class on the clicked button
    event.target.classList.toggle("active");

    // Get all active filters
    const activeFilters = Array.from(filterButtons)
      .filter((button) => button.classList.contains("active") && button.textContent !== "Wszystkie")
      .map((button) => button.textContent);

    // Show recipes based on the active filters
    showRecipes({category: params.category}, activeFilters);
  }

  // Add click event listener to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => toggleActiveClass(e, params));
  });
};

// If the current page is the category page, generate filters and add event listeners
if (window.location.href.includes("category.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  (async () => {
    await generateFilters({ category })
    addFilterEventListeners({ category });
  })();
  
}

// Add event listener to the filters header
document.addEventListener('DOMContentLoaded', function() {
  const filtersHeader = document.querySelector('.filters-header');
  filtersHeader.addEventListener('click', function() {
    const filterGroup = this.nextElementSibling;
    filterGroup.classList.toggle('active');
    this.classList.toggle('active'); // Add this line to toggle the class on the header as well
  });
});