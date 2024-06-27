document.addEventListener("DOMContentLoaded", main);

function main() {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = "Dodaj przepis | Kocham Gotować";

    bacicInfoEventsListeners();
    tagsEventsListeners();
    ingredientsEventsListeners();
}

// -------------------------------------------------------------------------------- //

function bacicInfoEventsListeners() {
    // Preparation time
    document.getElementById("recipeTime").addEventListener("change", () => {
        const value = document.getElementById("recipeTime").value;
        if(value > 120) {
            document.getElementById("recipeTime").value = 120;
        }
        if(value < 1) {
            document.getElementById("recipeTime").value = 1;
        }
    });

    // Portion Quantity
    document.getElementById("recipePortions").addEventListener("change", () => {
        const value = document.getElementById("recipePortions").value;
        if(value > 100) {
            document.getElementById("recipePortions").value = 100;
        }
        if(value < 1) {
            document.getElementById("recipePortions").value = 1;
        }
    });
}

// -------------------------------------------------------------------------------- //

function tagsEventsListeners() {
    document.getElementById("addTagButton").addEventListener("click", () => {
        const tagInput = document.getElementById("tagInputField");
        const tag_str = tagInput.value;
        console.log("New tag: ", tag_str);

        if(tag_str !== "") {
            const tagsContainer = document.getElementById("tagsContainer");
            const tag = document.createElement("div");
            tag.className = "single-tag-container";
            tag.innerHTML = `<li>${tag_str}</li>`;

            const button = document.createElement("button");
            button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            button.addEventListener("click", removeTagEvent);
            tag.appendChild(button);

            tagsContainer.appendChild(tag);
            tagInput.value = "";
        }
    });
}

function removeTagEvent() {
    const tag = this.parentElement;
    tag.remove();
}

// -------------------------------------------------------------------------------- //

function ingredientsEventsListeners() {
    document.getElementById("addIngredientButton").addEventListener("click", () => {
        const ingredientNameContainer = document.getElementById("ingredientInputFieldName");
        const ingredientQuantityContainer = document.getElementById("ingredientInputFieldQuantity");
        const ingredientUnitContainer = document.getElementById("ingredientInputFieldUnit");

        const ingredientName = ingredientNameContainer.value;
        const ingredientQuantity = ingredientQuantityContainer.value;
        const ingredientUnit = ingredientUnitContainer.value;

        console.log("New ingredient: ", ingredientName, ingredientQuantity, ingredientUnit);

        if(ingredientName !== "" && ingredientQuantity !== "" && ingredientUnit !== "") {
            const ingredientsContainer = document.getElementById("ingredientsContainer");
            if (ingredientsContainer.childElementCount === 0) {
                ingredientsContainer.innerHTML = "";
                const new_table = document.createElement("table");
                new_table.className = "ingredients-table";
                ingredientsContainer.appendChild(new_table);
            }

            const table = ingredientsContainer.children[0];
            const row = table.insertRow(-1);

            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerHTML = ingredientName;
            cell2.innerHTML = ingredientQuantity; // TODO:  Quantity + Unit
            cell3.innerHTML = ingredientUnit; // TODO:  Delete button
        }

        ingredientNameContainer.value = "";
        ingredientQuantityContainer.value = "";
    });
}

function removeIngredientEvent() {
    const ingredient = this.parentElement;
    ingredient.remove();
}

// -------------------------------------------------------------------------------- //
