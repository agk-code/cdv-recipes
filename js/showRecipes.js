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

const generateRecipes = (recipes) => {
    return recipes.map(recipe => (
        `
            <div class="recipe">
                <a href="${"recipe.html?id=" + recipe.id}">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description}</p>
                </a>
            </div>
        `
    ));
}

const showRecipes = async (params, activeFilters) => {
    const resultRecipes = await recipes();
    const resultCategories = await categories();

    const recipeContainers = document.querySelectorAll('.recipes-container');
    const categoriesContainer = document.querySelector('#categoriesContainer');
    const mobileCategoriesContainer = document.querySelector('#mobileCategoriesContainer');

    const categoriesHtml = resultCategories.map(category => {
        return `
            <div class="category category-${category.id}">
                <a href="/category.html?category=${category.slug}">
                    <h3>${category.name}</h3>
                </a>
            </div>
        `;
    });

    if (params?.category !== undefined) {
        const { category } = params;
        // Filter recipes by category and active filters
        const filteredRecipes = resultRecipes.filter(recipe => {
            return recipe.category.toLowerCase() === category && 
            ((!activeFilters || activeFilters.length === 0) || 
            activeFilters.every(filter => 
                recipe.ingredients.some(ingredient => 
                ingredient.name.toLowerCase() === filter.toLowerCase()
                )
            )
            );
        });

        if (filteredRecipes.length === 0) {
            recipeContainers[0].innerHTML = '<h2>Nie znaleziono przepisów</h2>';
            return;
        }

        const tempHtml = generateRecipes(filteredRecipes);

        recipeContainers[0].innerHTML = tempHtml.join('');
    } else if (params?.query !== undefined)
    {
        const { query } = params;
        const filteredRecipes = resultRecipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()));

        if (filteredRecipes.length === 0)
        {
            recipeContainers[0].innerHTML = '<h2>Nie znaleziono przepisów</h2>';
            return;
        }

        const tempHtml = generateRecipes(filteredRecipes);

        recipeContainers[0].innerHTML = tempHtml.join('');
    }
    else 
    {
        recipeContainers.forEach(container => {
            const randomRecipes = getRandomRecipes(resultRecipes, 6);
    
            const tempHtml = generateRecipes(randomRecipes)
    
            container.innerHTML = tempHtml.join('');
        });
    }
    
    categoriesContainer.innerHTML = categoriesHtml.join('');
    mobileCategoriesContainer.innerHTML = categoriesHtml.join('');
};

if (window.location.href.includes('category.html'))
{
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category === null)
    {
        window.location.href = "index.html";
    }
    showRecipes({ category });
} else if (window.location.href.includes('search.html'))
{
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query === null)
    {
        window.location.href = "index.html";
    }
    showRecipes({ query });
}
else 
{
    showRecipes();
}
