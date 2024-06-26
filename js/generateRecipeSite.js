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
    if (currentRecipe === undefined) {
        console.error("Recipe not found");
        window.location.href = "index.html";
    }

    return currentRecipe;
};

// -------------------------------------------------------------------------------- //

async function getAuthorNameById(authorId) {
    const authorsTab = async () => {
        try {
            const response = await fetch('./data/authors.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const authors = await authorsTab();

    if (authorId === undefined || authors === null) {
        console.error("Error: Get author name by id");
        return undefined;
    }

    const currentAuthor = authors["authors"].find(author => author.id == authorId);
    if (currentAuthor === undefined) {
        console.error("Author not found");
        return "Unknown author";
    }

    return currentAuthor.name;
}

// -------------------------------------------------------------------------------- //

document.addEventListener("DOMContentLoaded", () => {
    getCurrentRecipe().then(async (currentRecipe) => {
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
        infoContainer.innerHTML = await generateInfoList(currentRecipe);
        tagsContainer.innerHTML = generateTagsList(currentRecipe.tags);
        descriptionContainer.innerHTML = `<p>${currentRecipe.description}</p>`;
        portionsQuantity.innerHTML = getPotionQuantity(currentRecipe.portions);
        ingredientsContainer.innerHTML = generateIngredientsList(currentRecipe.ingredients);
        preparationContainer.innerHTML = generatePreparationList(currentRecipe.preparation);
    });
});

// -------------------------------------------------------------------------------- //

async function generateInfoList(recipe) {
    let author = recipe.author;
    const authorId = recipe.authorId;
    const creationDate = new Date(recipe.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = creationDate.toLocaleDateString(undefined, options);
    const preparationTime = recipe.preparation_time;
    
    let htmlString = "";

    if(author === undefined && authorId === undefined){
        console.log("Error: Undefined author and authorId");
        htmlString += `<li><i class="fa-solid fa-user"></i>Unknow author</li>`;
    }
    else {
        if(author === undefined && authorId !== undefined){
            console.log("Loading author name...");
            author = await getAuthorNameById(authorId);
            console.log("Author name: ", author);
        }

        if (authorId !== undefined && author !== undefined) {
            htmlString += `<li><i class="fa-solid fa-user"></i> <a href="author-showcase.html?id=${authorId}">${author}</a></li>`;
        }
        
        if (authorId === undefined && author !== undefined) {
            console.log("Error: Undefined authorId");
            htmlString += `<li><i class="fa-solid fa-user"></i> ${author}</li>`;
        }
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
            <li><a href="/search.html?query=${tag}">${tag}</a></li>
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
