const searchInputs = document.querySelectorAll('nav input');
const searchButton = document.querySelectorAll('nav button');

searchButton.forEach((button, idx) => {
    button.addEventListener('click', function() {
        const searchValue = searchInputs[idx].value;
        window.location.href = `/search.html?query=${searchValue}`;
    });
});