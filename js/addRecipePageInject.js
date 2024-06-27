// -------------------------------------------------------------------------------- //

const categoriesTab = () => fetch('./data/categories.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });

async function getCategoryList() {
    const resultCategories = await categoriesTab();
    return resultCategories;
}

// -------------------------------------------------------------------------------- //

getCategoryList().then((resultCategories) => {
    const categoriesSelect = document.getElementById('recipeCategory');

    const categoriesHtml = resultCategories.map(category => {
        return `
            <option value="${category.id}">${category.name}</option>
        `;
    });

    categoriesSelect.innerHTML = categoriesHtml.join('');
});

// -------------------------------------------------------------------------------- //