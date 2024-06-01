const categories = () => fetch('./data/categories.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });

const recipes = () => fetch('./data/recipes.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });

const showRecipes = async () => {
    const resultRecipes = await recipes();
    const resultCategories = await categories();

    const recipesContainer = document.querySelector('#recipesContainer');
    const categoriesContainer = document.querySelector('#categoriesContainer');

    const tempHtml = await resultRecipes.map(recipe => {
        return `
            <div class="recipe">
                <a href="${recipe.link}">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description}</p>
                </a>
            </div>
        `;
    });

    const categoriesHtml = resultCategories.map(category => {
        return `
            <div class="category">
                <a href="${category.link}">
                    <h3>${category.name}</h3>
                </a>
            </div>
        `;
    });

    console.log(tempHtml)

    recipesContainer.innerHTML = tempHtml.join('');
    categoriesContainer.innerHTML = categoriesHtml.join('');
};

showRecipes();