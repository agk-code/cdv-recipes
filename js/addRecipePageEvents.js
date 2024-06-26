document.addEventListener("DOMContentLoaded", main);

function main() {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = "Dodaj przepis | Kocham Gotować";

    bacicInfoEventsListeners();
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
    const tagsContainer = document.getElementById("tagsContainer");
    const tagsInput = document.getElementById("tagsInput");
    const tagsList = document.getElementById("tagsList");

    tagsInput.addEventListener("keyup", (event) => {
        if(event.key === "Enter") {
            const value = tagsInput.value;
            if(value.length > 0) {
                const tag = document.createElement("div");
                tag.classList.add("tag");
                tag.innerHTML = value;
                tagsList.appendChild(tag);
                tagsInput.value = "";
            }
        }
    });

    tagsList.addEventListener("click", (event) => {
        if(event.target.classList.contains("tag")) {
            tagsList.removeChild(event.target);
        }
    });
}


// -------------------------------------------------------------------------------- //
