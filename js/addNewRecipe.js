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

document.addEventListener("DOMContentLoaded", main);

function main() {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerHTML = "Dodaj przepis | Kocham Gotować";
}

// -------------------------------------------------------------------------------- //



// -------------------------------------------------------------------------------- //



// -------------------------------------------------------------------------------- //
