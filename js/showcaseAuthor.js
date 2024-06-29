const authors = () => fetch('./data/authors.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
    });

const currentAuthorId = new URLSearchParams(window.location.search).get('id');
console.log("Author_id: ", currentAuthorId);

if(currentAuthorId === null) {
    window.location.href = "index.html";
}


const recipesAuthorPage = () => fetch('./data/recipes.json')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error(error);
    });



const getAuthorsRecipes = (recipes, currentAuthorId) => {
    const selected = recipes.filter(recipe => recipe.authorId == currentAuthorId);
    console.log("Selected: ", selected);
    return selected;
};


const generateAuthorsRecipes = (recipes) => {
    console.log("Recipes for generation: ", recipes);
    return recipes.map(recipe => (
        `
            <div class="recipe">
                <a href="${"recipe.html?id=" + recipe.id}">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description}</p>
                </a>
            </div>
        `
    ));
};

const showAuthorsRecipes = async () => {
    const resultRecipes = await recipesAuthorPage();
    const authorRecipes = getAuthorsRecipes(resultRecipes, currentAuthorId);

    const recipeContainers = document.querySelectorAll('.authors-recipes-container');

    const recipesHtml = generateAuthorsRecipes(authorRecipes);

    recipeContainers[0].innerHTML = recipesHtml.join('');

};

const showAuthor = async () => {
    const resultAuthors = await authors();
    
    // Select an author by id
    const currentAuthor = resultAuthors.authors.find(author => author.id == currentAuthorId);

        return `
            <div class="author">
                <div class="avatar-with-citation">
                    <div class="authors-avatar">
                        <div class="our-authors__icon">
                            <i class="icon icon-verified"></i>
                        </div>
                        <img class="author-picture" src="${currentAuthor.profilePicture}" alt="${currentAuthor.name}">
                    </div>
                    <h2 class="author-name">${currentAuthor.name}</h2>
                    <div class="author-citation">
                        <i>&quot${currentAuthor.quote}&quot</i>
                    </div>     
                </div>
                <p class="author-biography">${currentAuthor.biography}</p>
            </div>
        `;

    
};

((async () => {
    const authorsHtml = await showAuthor();
    const authorsContainer = document.querySelector('#authorShowcaseContainer');
    authorsContainer.innerHTML = authorsHtml;
})());

showAuthorsRecipes();

