const currentAuthorId = 0;

const authors = () => fetch('./data/authors.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
    });

const showAuthor = async () => {
    const resultAuthors = await authors();

    const authorsContainer = document.querySelector('#authorShowcaseContainer');

    // Select an author by id
    const selectedAuthor = resultAuthors.authors.slice(currentAuthorId, 1);

    const authorsHtml = selectedAuthor.map(author => {

        return `
            <div class="author">
                <div class="avatar-with-citation">
                    <div class="authors-avatar">
                        <div class="our-authors__icon">
                            <i class="icon icon-verified"></i>
                        </div>
                        <img class="author-picture" src="${author.profilePicture}" alt="${author.name}">
                    </div>
                    <h2 class="author-name">${author.name}</h2>
                    <div class="author-citation">
                        <i>${author.quote}</i>
                    </div>     
                </div>
                <p class="author-biography">${author.biography}</p>
            </div>
        `;
    });

    authorsContainer.innerHTML = authorsHtml.join('');
};



showAuthor();
