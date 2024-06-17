const authors = () => fetch('./data/authors.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
    });

const showAuthors = async () => {
    const resultAuthors = await authors();

    const authorsContainer = document.querySelector('#authorsContainer');

    // Slice the array to get only the first 4 authors
    const firstFiveAuthors = resultAuthors.authors.slice(0, 4);

    const authorsHtml = firstFiveAuthors.map(author => {

        return `
            <div class="author">
                <div class="authors-avatar">
                    <div class="our-authors__icon">
                        <i class="icon icon-verified"></i>
                    </div>
                    <img class="author-picture" src="${author.profilePicture}" alt="${author.name}">
                </div>
                <h2 class="author-name">${author.name}</h2>
                <p class="author-biography">${author.biography}</p>
            </div>
        `;
    });

    authorsContainer.innerHTML = authorsHtml.join('');
};

showAuthors();
