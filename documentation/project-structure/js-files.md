STURKTURA PROJEKTU - CDV-RECIPES - JS


JavaScript
Struktury JS odpowiedzialne za konkretne funkcjonalności znajdują się w oddzielnych plikach .js,
wszystkie w folderze js.



slider.js
- Odpowiedzialny za generowanie estetycznego slidera z przepisammi na stronie głównej index.html

funckje:
fetchRecipes - pobiera dane z pliku recipes.json
showSlider - czeka na wynik fetchRecipes(),
znajduje element DOM z id swiperWrapper,
generuje i wyswietla elementy HTMl dla kadzego przepisu,



showRecipes.js
- Odpowiedzialny za generowanie grida przepisów dostępnego w rónych miejscach w witrynie.

funkcje:
categories oraz recipes pobierają dane z powiązanych plików categories.json oraz recipes.json,
getRandomRecipes - funckja zamienia losowo kolejnoscia znalezione przez recipes() elementy,
generateRecipes - generuje elementy HTMl na podstawie wczytanych przepisow,
showRecipes - mapuje i wyswietla elementy HTMl na stronie korzystajacej ze skryptu,

Skrypt posiada takze rozbudowana obsluge bledow, uwzgledniajaca miedzy innnymi przypadki braku dostepnych przepisow.



showcaseAuthor.js
- Odpowiedzialny za generowanie strony pokazujacej wszelkie publiczne atrybuty autora na stronie author-showcase.html

funkcje:
funkcja showAuthor generuje i wyswietla dane aktualnie przedstawianego autora,
funckje authors oraz recipesAuthorPage wczytuja dnae z plików authors.json oraz recipes.json
nastepnie funkcja getAuthorsRecipes wyciaga tylko potrzebne do wygenerowania przepisy aktualnie wyswietlanego na stronie autora,
nastepnie przepisy sa generowane przez generateAuthorsRecipes oraz wyswietlane funkcją showAuthorsRecipes



showAuthors.js
- Sktypt pobiera dane z authors.json i generuje na ich podstawie elementy HTMl wyswietlane na stronie głownej index.html



search.js
- Skrypt odpowiedzialny za uruchomienie wyszukiwania przepisów z paska nawigacyjnego


filters.js
- Skrypt odpowiada za logikę umoliwiającą wygodnie przeszukiwanie kategorii względem wybranych przez uzytkownika filtrów.
Sktypr zbiera informacje na temat wybranych filtrow i zarzadza wyswietlaniem konkretnych przepisow uzytkownikowi na podstronie kategorii.



mobileMenu.js
- Skrypt odpowiedzialny za zmiane atrybotuw klasowych dla generowania i wyswietlanie elementow nawigacyjnych menu dla urzadzen mobilnych.
Skrypt zbiera informacje o przepisach oraz wybranych filtrach i na tej podstawie zarządza wyświetlanymi uytkownikowi przepisami, widocznymi na podstronie kategorii.



generateRecipeSite.js
- Skrypt odpowiedzialny za generowanie wszystkich elementow formularza dodawania nowego przepisu na stronie add-recipe.html
zbudowany jest z funkcji odpowiadajacych odpowiednim elementom formularza, zapewniajacych wygodne wyswietlanie wpisywanych danych i przekazanie ich dalej po zatwierdzeniu.



generateCategoryTitle
- Skrypt odpowiedzialny za wyswietlanie nazw kategorii na podstronach z przepisami wyswiewtlanymi wedlug ich kategorii.
czyta plik categories.json i na jego podstawie zwraca i wyswietla nazwe wyswietlana w odpowiednim elemencie na stronie.



addRecipePageSave.js
- Skrypt odpowiedzialny za logikę zapisywania nowych przepisow z generowanego wczesniej formularza na stronie add-recipe.html



addRecipePageInject.js
- Skrypt uzupelnia elementy na stronie formularza dodania nowego przepisu add-rrecipe.html,
ulatwiajac wybor kategorii na podstawie pliku categories.json



addrecipePageEvents.js
- Skrypt zawierajacy event listenery obslugujace logike przyciskow w formularzu dodawania przepisu na stronie add-recipe.html,
ulatwiajacch miedzy innymi dodanie zdjecia czy wygodną manipulację krokami procesu przygotowania dania.