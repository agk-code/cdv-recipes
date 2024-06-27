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

