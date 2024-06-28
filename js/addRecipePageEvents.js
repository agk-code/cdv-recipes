document.addEventListener("DOMContentLoaded", main);

function main() {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = "Dodaj przepis | Kocham Gotować";

    bacicInfoEventsListeners();
    imageEventsListeners();
    tagsEventsListeners();
    ingredientsEventsListeners();
    preparationEventsListeners();
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

function imageEventsListeners() {
    document.getElementById("imageUploadArea").addEventListener("click", () => {
        document.getElementById("recipeImageInput").click();
    });

    document.getElementById("recipeImageInput").addEventListener("change", () => {
        console.log("Image changed");
        const image = document.getElementById("recipeImageInput").files[0];
        const imagePreview = document.getElementById("recipeImagePreview");
        const reader = new FileReader();

        reader.onload = () => {
            console.log("Image loaded");
            imagePreview.src = reader.result;
            document.getElementById("imageUploadArea").className = "image-upload-area-uploaded";
        }

        if(image) {
            reader.readAsDataURL(image);
        }
    });
}

// -------------------------------------------------------------------------------- //

function tagsEventsListeners() {
    document.getElementById("tagInputField").addEventListener("keypress", (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById("addTagButton").click();
        }
    });

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
            button.className = "list-action-button";
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
    document.getElementById("ingredientInputFieldQuantity").addEventListener("change", () => {
        const value = document.getElementById("ingredientInputFieldQuantity").value;
        if(value > 1500) {
            document.getElementById("ingredientInputFieldQuantity").value = 1000;
        }
        if(value < 0) {
            document.getElementById("ingredientInputFieldQuantity").value = 0;
        }
    });

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
            
            // Create a new row
            const row_html_str = `
            <tr>
                <td>${ingredientQuantity} ${ingredientUnit}</td>
                <td>${ingredientName}</td>
            </tr>
            `;
            const row = document.createElement("tr");
            row.innerHTML = row_html_str;
            
            // Add a button to remove the ingredient
            const removeButton = document.createElement("button");
            removeButton.className = "list-action-button";
            removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            removeButton.addEventListener("click", removeIngredientEvent);
            row.appendChild(removeButton);

            // Add a button to move the ingredient up
            const moveUpButton = document.createElement("button");
            moveUpButton.className = "list-action-button";
            moveUpButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            moveUpButton.addEventListener("click", moveIngredientUpEvent);
            row.appendChild(moveUpButton);

            // TODO: Add a button to edit the ingredient order on the list

            // Add new row to the table
            table.appendChild(row);

            // Clear the input fields
            ingredientNameContainer.value = "";
            ingredientQuantityContainer.value = "";
        }
    });
}

function moveIngredientUpEvent() {
    const row = this.parentElement;
    const table = row.parentElement;
    const previousRow = row.previousElementSibling;

    if (previousRow) {
        table.insertBefore(row, previousRow);
    }
}

function removeIngredientEvent() {
    const ingredient = this.parentElement;
    ingredient.remove();
}

// -------------------------------------------------------------------------------- //

function preparationEventsListeners(){
    document.getElementById("addPreparationStepButton").addEventListener("click", () => {
        const preparationStepArea = document.getElementById("preparationStepInputArea");

        const new_step = document.createElement("div");
        new_step.className = "single-preparation-step-container";
        new_step.innerHTML = `<span role="textbox" contenteditable></span>`;

        const button = document.createElement("button");
        button.className = "remove-element-button";
        button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        button.addEventListener("click", removePreparationStepEvent);

        new_step.appendChild(button);
        preparationStepArea.appendChild(new_step);
    });
}

function removePreparationStepEvent() {
    const step = this.parentElement;
    step.remove();
}

// -------------------------------------------------------------------------------- //
