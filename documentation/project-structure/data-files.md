STURKTURA PROJEKTU - CDV-RECIPES - DATA - JSON


Pliki danych - JSON
Struktury autorów, kategorii oraz przepisów znajdują się w oddzielnych plikach .json
Dzięki uyciu tych dancyh, strony generowane są dynamicznie na podstawie dostepnych informacji.

Wszystkie pliki .json znajdują się w folderze "data"

authors.json

- Plik zawiera w sobie tablicę "authors", kazdy z obiektów tablicy posiada określone pola z przydzielonymi wartosciami:

id - unikatowy identifikator numeryczny autora,
name - teskt zawierający imię i nazwisko,
quoute - inspirujący cytat autora,
biography - krótka nota biograficzna,
profilePicture - link do zdjecia profilowego
publishedWorks - tablica zawierająca wydane przez autora publikacje ksiązkowe,
kazda z nich posiada atrybuty:
    title - tytul
    year - rok wydania
    link - link do strony, na której mozna kupic publikację



categories.json

- Plik zawiera tablicę kategorii, do których przypisywane są przepisy.
Zawiera pola:
id - unikatowy identyfikator kategorii
name - nazwa wyswietlana
slug - nazwa do odwolan w zapytaniach czy linkach



recipes.json
- Plik zawiera pełne przepisy na pyszne dania.
Zawiera pola:
id - unikalny identyfikator przepisu
name- nazwa wyswietlana
image - link do zdjecia dania
ingredients - potrzebne skladniki, tablica, której kazdy element zawiera pola:
    name - nazwa wyswietlana
    quantity - potrzebna ilosc
    unit - jednostka liczenia ilosci skladnika
description - krótki opis dania
preparation - szczegolowy opis sposobu przygotowania dania
category - nazwa kategorii odnoszaca sie do atrybutu "slug" z categories.json
date - data dodania przepisu,
authorId - identyfikator autora przepisu, odnoszacy sie do pola "id" z pliku authors.json,
tags - przypisane do przepisu tagi dlałatwego filtrowania,
preparation_time - szacowany czas przygotowania dania.