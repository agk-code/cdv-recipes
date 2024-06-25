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
    // console.log("Loading current recipe...");
    const resultRecipe = await recipesTab();
    const currentRecipe = resultRecipe.find(recipe => recipe.id == recipeId);
    // console.log("Current recipe: ", currentRecipe);
    return currentRecipe;
};

// -------------------------------------------------------------------------------- //

getCurrentRecipe().then((currentRecipe) => {
    const imageContainer = document.querySelector('#imageContainer');
    const nameContainer = document.querySelector('#nameContainer');
    const infoContainer = document.querySelector('#infoContainer');
    const tagsContainer = document.querySelector('#tagsContainer');
    const descriptionContainer = document.querySelector('#descriptionContainer');
    const ingredientsContainer = document.querySelector('#ingredientsContainer');
    const preparationContainer = document.querySelector('#preparationContainer');

    imageContainer.innerHTML = `<img src=${currentRecipe.image} alt="Dish" id="recipeImage">`;
    nameContainer.innerHTML = currentRecipe.name;
    infoContainer.innerHTML = generateinfoList(currentRecipe);
    tagsContainer.innerHTML = generateTagsList(currentRecipe.tags);
    descriptionContainer.innerHTML = `<p>${currentRecipe.description}</p>`;
    ingredientsContainer.innerHTML = generateIngredientsList(currentRecipe.ingredients);
    preparationContainer.innerHTML = generatePreparationList(currentRecipe.preparation);
});

// -------------------------------------------------------------------------------- //

function generateinfoList(recipe) {
    const author = recipe.author;
    const creationDate = new Date(recipe.date);
    const preparationTime = recipe.preparation_time;
    
    let htmlString = "";

    if(author !== undefined) {
        htmlString += `<p>Author: ${author}</p>`;
    }

    if(creationDate !== undefined) {
        htmlString += `<p>Creation date: ${creationDate.toLocaleDateString()}</p>`;
    }

    if(preparationTime !== undefined) {
        htmlString += `<p>Preparation time: ${preparationTime} minutes</p>`;
    }

    return htmlString;
}


// -------------------------------------------------------------------------------- //

function generateIngredientsList(ingredients) {
    const table_rows = ingredients.map(ingredient => {
        return `
            <tr>
                <td>${ingredient.quantity} ${ingredient.unit}</td>
                <td>${ingredient.name}</td>
            </tr>
        `;
    }).join('');

    return `
        <table>
            ${table_rows}
        </table>
    `;
}

// -------------------------------------------------------------------------------- //

function generateTagsList(tags) {
    if (tags === undefined || tags.length === 0) {
        return '';
    }
    return tags.map(tag => {
        return `
            <li>${tag}</li>
        `;
    }).join('');
}

// -------------------------------------------------------------------------------- //

function generatePreparationList(preparation) {
    if (preparation === undefined) {
        return '';
    }

    return preparation.map(step => {
        return `
            <p>${step}</p>
        `;
    }).join('');
}

// -------------------------------------------------------------------------------- //
