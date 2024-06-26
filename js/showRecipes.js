const categories = () => fetch('./data/categories.json')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error(error);
    });

const recipes = () => fetch('./data/recipes.json')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error(error);
    });

const getRandomRecipes = (recipes, count) => {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const showRecipes = async () => {
    const resultRecipes = await recipes();
    const resultCategories = await categories();

    const recipeContainers = document.querySelectorAll('.recipes-container');
    const categoriesContainer = document.querySelector('#categoriesContainer');
    const mobileCategoriesContainer = document.querySelector('#mobileCategoriesContainer');

    const categoriesHtml = resultCategories.map(category => {
        return `
            <div class="category category-${category.id}">
                <a href="${category.link}">
                    <h3>${category.name}</h3>
                </a>
            </div>
        `;
    });

    recipeContainers.forEach(container => {
        const randomRecipes = getRandomRecipes(resultRecipes, 6);

        const tempHtml = randomRecipes.map(recipe => {
            return `
                <div class="recipe">
                    <a href="${"recipe.html?id=" + recipe.id}">
                        <img src="${recipe.image}" alt="${recipe.name}">
                        <h2>${recipe.name}</h2>
                        <p>${recipe.description}</p>
                    </a>
                </div>
            `;
        });

        container.innerHTML = tempHtml.join('');
    });

    categoriesContainer.innerHTML = categoriesHtml.join('');
    mobileCategoriesContainer.innerHTML = categoriesHtml.join('');
};

showRecipes();
