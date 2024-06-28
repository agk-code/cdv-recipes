const recipeId = new URLSearchParams(window.location.search).get('id');
console.log("Recipe_id: ", recipeId);

const urlRecipeJSON = new URLSearchParams(window.location.search).get('recipeJSON');

if(recipeId === null && urlRecipeJSON === null) {
    window.location.href = "index.html";
}

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
    if (urlRecipeJSON !== null) {
        const recipeJSON = JSON.parse(urlRecipeJSON);
        return recipeJSON;
    }

    const resultRecipe = await recipesTab();
    const currentRecipe = resultRecipe.find(recipe => recipe.id == recipeId);
    return currentRecipe;
};

// -------------------------------------------------------------------------------- //

document.addEventListener("DOMContentLoaded", () => {
    getCurrentRecipe().then((currentRecipe) => {
        const pageTitle = document.getElementById('pageTitle');
        pageTitle.innerHTML = `${currentRecipe.name} | Kocham Gotować`;

        const imageContainer = document.querySelector('#imageContainer');
        const nameContainer = document.querySelector('#nameContainer');
        const infoContainer = document.querySelector('#infoContainer');
        const tagsContainer = document.querySelector('#tagsContainer');
        const descriptionContainer = document.querySelector('#descriptionContainer');
        const portionsQuantity = document.querySelector('#portionsQuantity');
        const ingredientsContainer = document.querySelector('#ingredientsContainer');
        const preparationContainer = document.querySelector('#preparationContainer');

        imageContainer.innerHTML = `<img src=${currentRecipe.image} alt="Dish" id="recipeImage">`;
        nameContainer.innerHTML = currentRecipe.name;
        infoContainer.innerHTML = generateInfoList(currentRecipe);
        tagsContainer.innerHTML = generateTagsList(currentRecipe.tags);
        descriptionContainer.innerHTML = `<p>${currentRecipe.description}</p>`;
        portionsQuantity.innerHTML = getPotionQuantity(currentRecipe.portions);
        ingredientsContainer.innerHTML = generateIngredientsList(currentRecipe.ingredients);
        preparationContainer.innerHTML = generatePreparationList(currentRecipe.preparation);
    });
});

// -------------------------------------------------------------------------------- //

function generateInfoList(recipe) {
    const author = recipe.author;
    const creationDate = new Date(recipe.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = creationDate.toLocaleDateString(undefined, options);
    const preparationTime = recipe.preparation_time;
    
    let htmlString = "";

    if(author !== undefined) {
        htmlString += `<li><i class="fa-solid fa-user"></i> ${author}</li>`;
    }

    if(creationDate !== undefined) {
        htmlString += `<li><i class="fa-regular fa-calendar-days"></i> ${formattedDate}</li>`;
    }

    if(preparationTime !== undefined) {
        htmlString += `<li><i class="fa-solid fa-hourglass-half"></i> ${preparationTime}</li>`;
    }

    return htmlString;
}

// -------------------------------------------------------------------------------- //

function getPotionQuantity(portions) {
    if(portions === undefined) {
        return '1 porcje'; // default value
    }

    const quantity = portions.quantity;
    const unit = portions.unit;

    return `${quantity} ${unit}`;
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

    if(typeof preparation === "string") {
        return `
            <p>${preparation}</p>
        `;
    }

    return preparation.map(step => {
        return `
            <p>${step}</p>
        `;
    }).join('');
}

// -------------------------------------------------------------------------------- //

function injectRecipeNameToTitleAndURL(recipe) {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = `${recipe.name} | Kocham Gotować`;

    // It not necessary to add recipe name to URL but it's lokking better for users
    const recipeNameURL = new URLSearchParams(window.location.search).get('name');
    const correctRecipeName = recipe.name.replace(/\s+/g, '-').toLowerCase();
    console.log("Recipe_name: ", recipeNameURL);
    
    if(recipeNameURL === null || recipeNameURL !== correctRecipeName) {
        window.history.replaceState({}, document.title, `?id=${recipe.id}&name=${correctRecipeName}`);
    }
}

// -------------------------------------------------------------------------------- //
