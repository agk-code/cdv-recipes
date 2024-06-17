const recipeId = new URLSearchParams(window.location.search).get('id');
console.log("Recipe_id: ", recipeId);

// -------------------------------------------------------------------------------- //

const recipesTab = () => fetch('./data/recipes.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });

// -------------------------------------------------------------------------------- //

async function getCurrentRecipe() {
    console.log("Loading current recipe...");
    const resultRecipe = await recipesTab();
    const currentRecipe = resultRecipe.find(recipe => recipe.id == recipeId);
    console.log("Current recipe: ", currentRecipe);
    return currentRecipe;
};

// -------------------------------------------------------------------------------- //

getCurrentRecipe().then((currentRecipe) => {
    const imageContainer = document.querySelector('#imageContainer');
    const nameContainer = document.querySelector('#nameContainer');
    const descriptionContainer = document.querySelector('#descriptionContainer');
    const ingredientsContainer = document.querySelector('#ingredientsContainer');
    const tagsContainer = document.querySelector('#tagsContainer');

    imageContainer.innerHTML = `<img src=${currentRecipe.image} alt="Dish" id="recipeImage">`;
    nameContainer.innerHTML = currentRecipe.name;
    descriptionContainer.innerHTML = `<p>${currentRecipe.description}</p>`;

    const ingredientsList = generateIngredientsList(currentRecipe.ingredients);
    ingredientsContainer.innerHTML = ingredientsList.join('');

    const tagsList = generateTagsList(currentRecipe.tags);
    tagsContainer.innerHTML = tagsList.join('');
});

// -------------------------------------------------------------------------------- //

function generateIngredientsList(ingredients) {
    return ingredients.map(ingredient => {
        return `
            <li>${ingredient}</li>
        `;
    });
}

// -------------------------------------------------------------------------------- //

function generateTagsList(tags) {
    return tags.map(tag => {
        return `
            <li>${tag}</li>
        `;
    });
}

// -------------------------------------------------------------------------------- //
