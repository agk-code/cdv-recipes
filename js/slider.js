const fetchRecipes = () => fetch('./data/recipes.json')
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    });

const showSlider = async () => {
    const recipes = await fetchRecipes();
    const swiperWrapper = document.querySelector('#swiperWrapper');

    const sliderHtml = recipes.slice(0, 5).map(recipe => {
        return `
            <div class="swiper-slide">
                <article class="post-${recipe.id} slider-post">
                    <div class="slider-post__thumbnail">
                        <img src="${recipe.image}" alt="${recipe.name}" class="slider-image">
                    </div>
                    <div class="slider-post__info">
                        <div class="wrap">
                            <div class="wrap-inner">
                                <div class="slider-post__inner">
                                    <div class="slider-post__header">
                                        <div class="entry-meta slider-post__meta">
                                            <time class="updated" datetime="${recipe.date}">${new Date(recipe.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                        </div>
                                        <h2 class="entry-title slider-post__title">
                                            <a href="${"recipe.html?id=" + recipe.id}">${recipe.name}</a>
                                        </h2>
                                    </div>
                                    <div class="slider-post__content">
                                        <p class="clamped-paragraph">${recipe.description}</p>
                                        <div class="entry-more-link">
                                            <a href="${"recipe.html?id=" + recipe.id}" class="more-link">Czytaj dalej <span class="rarr">→</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }).join('');

    swiperWrapper.innerHTML = sliderHtml;

    const slides = document.querySelectorAll('.swiper-slide');
    let currentSlide = 0;
    const slideInterval = 20000; // time in milliseconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    document.querySelector('.prev').addEventListener('click', () => {
        clearInterval(autoSlide); // Stop the auto sliding when manually navigating
        currentSlide = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
        autoSlide = setInterval(nextSlide, slideInterval); // Restart the auto sliding
    });

    document.querySelector('.next').addEventListener('click', () => {
        clearInterval(autoSlide); // Stop the auto sliding when manually navigating
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval); // Restart the auto sliding
    });

    showSlide(currentSlide); // Show the first slide

    let autoSlide = setInterval(nextSlide, slideInterval); // Start the auto sliding
};

showSlider();
