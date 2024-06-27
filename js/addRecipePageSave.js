let generatingRecipeError = false;

// -------------------------------------------------------------------------------- //

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveRecipeButton").addEventListener("click", () => {
        console.log("Saving recipe...");
        const recipe = generateRecipeJSON();
        
        if(recipe === null) {
            console.log("Error while generating recipe JSON");
            return;
        }

        console.log("New recipe JSON: ", recipe);
    });
});

// -------------------------------------------------------------------------------- //

function generateRecipeJSON() {
    const recipeJSON = {
        "id":                   getRecipeId(),
        "date":                 getRecipeCreationDate(),
        "author":               getRecipeAuthor(),
        "name":                 getRecipeName(),
        "preparation_time":     getRecipePreparationTime(),
        "portions":             getRecipePortions(),
        "category":             getRecipeCategory(),
        "description":          getRecipeDescription(),
        "image":                getRecipeImage(),
        "tags":                 getRecipeTagsList(),
        "ingredients":          getRecipeIngredientsList(),
        "preparation":          getRecipePreparationSteps(),
    };

    if(generatingRecipeError) {
        return null;
    }

    return recipeJSON;
}

// -------------------------------------------------------------------------------- //

function getRecipeCreationDate() {
    return new Date().toISOString();
}

function getRecipeAuthor() {
    const urlUser = new URLSearchParams(window.location.search).get('user');
    if(urlUser === null) {
        return "unknown";
    }
    return urlUser;
}

function getRecipeId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}

// -------------------------------------------------------------------------------- //

function getRecipeName() {
    const name = document.getElementById("recipeName").value;

    if(name === "") {
        generatingRecipeError = true;
        alert("Recipe name is required!");
        return "Unknown recipe";
    }

    return name;
}

function getRecipePreparationTime() {
    const timeValue = document.getElementById("recipeTime").value;
    const timeUnit = document.getElementById("recipeTimeUnit").value;

    if(timeValue === "" || timeUnit === "") {
        generatingRecipeError = true;
        alert("Preparation time is required!");
        return "Unknown";
    }

    return `${timeValue} ${timeUnit}`;
}

function getRecipePortions() {
    const portionsValue = document.getElementById("recipePortions").value;
    const portionsUnit = document.getElementById("recipePortionsUnit").value;

    if(portionsValue === "" || portionsUnit === "") {
        generatingRecipeError = true;
        alert("Portions are required!");
        return "Unknown";
    }

    return {
        "quantity": portionsValue,
        "unit": portionsUnit,
    };
}

function getRecipeCategory() {
    const category = document.getElementById("recipeCategory").value;

    if(category === "") {
        generatingRecipeError = true;
        alert("Category is required!");
        return "Unknown";
    }

    return category;
}

function getRecipeDescription() {
    const description = document.getElementById("recipeDescription").value;

    if(description === "") {
        generatingRecipeError = true;
        alert("Description is required!");
        return "Unknown";
    }

    return description;
}

// -------------------------------------------------------------------------------- //

function getRecipeImage() {
    const image = document.getElementById("recipeImageInput").files[0];

    if(image === undefined) {
        generatingRecipeError = true;
        alert("Image is required!");
        return "images/logo.png";
    }

    return `images/${image.name}`;
}

// -------------------------------------------------------------------------------- //

function getRecipeTagsList() {
    const tagsContainer = document.getElementById("tagsContainer")
    const tagsList = tagsContainer.querySelectorAll("li"); 
    const tags = [];

    if(tagsList.length === 0) {
        generatingRecipeError = true;
        alert("Tags are required!");
        return [];
    }

    tagsList.forEach(tag => {
        tags.push(tag.innerText);
    });

    return tags;
}

// -------------------------------------------------------------------------------- //

function getRecipeIngredientsList() {
    const ingredientsList = [];

    const ingredientsTable = document.getElementById("ingredientsContainer").children[0];
    const ingredientsRows = ingredientsTable.querySelectorAll("tr");

    if(ingredientsRows.length === 0) {
        generatingRecipeError = true;
        alert("Ingredients are required!");
        return [];
    }

    ingredientsRows.forEach(row => {
        const name = row.children[1].innerText;
        const quantityAndUnit = row.children[0].innerText;
        const quantity = quantityAndUnit.split(" ")[0];
        const unit = quantityAndUnit.split(" ")[1];

        ingredientsList.push({
            "quantity": quantity,
            "name": name,
            "unit": unit,
        });
    });

    return ingredientsList;
}

// -------------------------------------------------------------------------------- //

function getRecipePreparationSteps() {
    const stepsList = [];
    const preparationList = Array.from(document.getElementsByClassName("single-preparation-step-container"));

    preparationList.forEach(stepContainer => {
        const stepTextbox = stepContainer.querySelector("span");
        const stepStr = stepTextbox.innerText;

        if(stepStr === "") {
            generatingRecipeError = true;
            alert("Preparation steps are required!");
            return [];
        }

        stepsList.push(stepTextbox.innerText);
    });

    return stepsList;
}

// -------------------------------------------------------------------------------- //
