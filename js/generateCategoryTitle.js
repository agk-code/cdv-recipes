const getCategories = () => fetch('./data/categories.json')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error(error);
    });

const generateCategoryTitle = async () => {
  const categories = await getCategories();

  const categoryTitle = document.querySelector('.category-section>h1');
  const urlParams = new URLSearchParams(window.location.search);
  const categorySlug = urlParams.get('category');

  const categoryItem = categories.find(item => item.slug === categorySlug);
  const nameOfCategory = categoryItem ? categoryItem.name : 'Nie znana kategoria';

  categoryTitle.innerHTML = nameOfCategory;
};

generateCategoryTitle();