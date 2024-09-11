/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { useSearchParams } from "react-router-dom";
import { CachedSearchesContext } from "../context/CachedSearchesContext";
import { Pagination } from "./Pagination";

export function SearchDisplay() {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]); // Håller cocktails-resultaten, från API eller cachade

  const [searchParams] = useSearchParams(); // Hämtar de aktuella sökparametrarna från URL (angavs i SearchForm)

  const { cachedSearches, addCachedSearches } = useContext(CachedSearchesContext); // Får tillgång till cachade sökningar, eller lägger till mer

  useEffect(() => {
    const searchTerm = searchParams.get("s"); //Parametrarna hämtas som objekt för at få cocktailnamnet
    const category = searchParams.get("c");
    const glass = searchParams.get("g");
    const ingredient = searchParams.get("i");
    const alcohol = searchParams.get("a");

    const fetchDataFromSearch = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}` // Använder searchTerm från URL-parametrarna för att hämta matchad sökning
        );
        const result = await response.json();
        addCachedSearches({ search: searchTerm!, cocktails: result.drinks }); // Cacha sökningen
        setCocktails(result.drinks); // Uppdatera state-variabeln cocktails - Spara resultaten
      } catch (error) {
        console.log(error);
      }
    };

    //Hämta cocktails vid filtrering
    const fetchDataByFilter = async (item: string, by: string) => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${by}=${item}`
        );
        const result = await response.json();
        return result.drinks;
      } catch (error) {
        console.log(error);
      }
    };

    //Filtrera efter kategori (när användaren inte angett sökord)
    const filterBySelections = async () => {
      let isSet = false;
      let filtered: ICocktail[] = [];
      if (category) {
        filtered = await fetchDataByFilter(category, "c");
        isSet = true;
      }
      if (glass) {
        const glassCocktails = await fetchDataByFilter(glass, "g");
        if (!isSet) {
          // Om detta är det första filtret som tillämpas (isSet är fortfarande false), sätts filtered till resultatet från glasfiltreringen och vi sätter isSet till true
          filtered = glassCocktails;
          isSet = true;
        } else {
          //Om en kategori redan valts filtrerar vi vidare genom att bara behålla de cocktails som finns i båda kategorierna. Detta görs genom att jämföra varje cocktail baserat på dess idDrink
          filtered = filtered.filter((filteredCocktail) =>
            glassCocktails.some(
              (glassCocktail: ICocktail) => filteredCocktail.idDrink === glassCocktail.idDrink
            )
          );
        }
      }
      if (ingredient) {
        const ingredientCocktails = await fetchDataByFilter(ingredient, "i");
        if (!isSet) {
          filtered = ingredientCocktails;
          isSet = true;
        } else {
          filtered = filtered.filter((filteredCocktail) =>
            ingredientCocktails.some(
              (ingredientCocktail: ICocktail) =>
                filteredCocktail.idDrink === ingredientCocktail.idDrink
            )
          );
        }
      }
      if (alcohol) {
        const alcoholCocktails = await fetchDataByFilter(alcohol, "a");
        if (!isSet) {
          filtered = alcoholCocktails;
          isSet = true;
        } else {
          filtered = filtered.filter((filteredCocktail) =>
            alcoholCocktails.some(
              (alcoholCocktail: ICocktail) => filteredCocktail.idDrink === alcoholCocktail.idDrink
            )
          );
        }
      }
      return filtered;
      // Efter att alla filter har bearbetats returneras den slutgiltiga listan över filtrerade cocktails som matchar användarens val
    };

    //Funktion som används när användaren har angett ett sökord (cocktailnamn) och vi redan har en lista med cocktails.
    function filterCocktails() {
      let filtered = cocktails;
      if (category) {
        filtered = filtered.filter((cocktail) => cocktail.strCategory === category);
      }
      if (glass) {
        filtered = filtered.filter((cocktail) => cocktail.strGlass === glass);
      }

      function getIngredients(cocktail: ICocktail) {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktail[`strIngredient${i}` as keyof ICocktail];
          if (ingredient) {
            ingredients.push(ingredient);
          }
        }
        return ingredients;
      }

      if (ingredient) {
        filtered = filtered.filter((cocktail) => getIngredients(cocktail).includes(ingredient));
      }
      if (alcohol) {
        filtered = filtered.filter((cocktail) => cocktail.strAlcoholic === alcohol);
      }
      return filtered;
    }

    const runSearch = async () => {
      if (searchTerm) {
        const cached = cachedSearches.find((cachedSearch) => cachedSearch.search === searchTerm);
        if (cached) {
          setCocktails(cached.cocktails); // Använd cachade resultat om de finns
        } else {
          await fetchDataFromSearch(); // Annars hämta från API:et
        }
        if (category || glass || ingredient || alcohol) {
          setCocktails(filterCocktails);
        }
      } else if (category || glass || ingredient || alcohol) {
        const filteredCocktails = await filterBySelections();
        setCocktails(filteredCocktails);
      } else {
        setCocktails([]);
      }
    };

    runSearch();
  }, [searchParams]); // Kör när sökparametrarna (i URL:en) ändras
  return (
    <>
      <div>
        {cocktails && cocktails.length > 0 ? (
          <Pagination data={cocktails} />
        ) : searchParams.size > 0 ? (
          searchParams.get("s") ||
          searchParams.get("c") ||
          searchParams.get("g") ||
          searchParams.get("i") ||
          searchParams.get("a") ? (
            "Search did not match any results"
          ) : (
            "Enter a search or selection"
          )
        ) : (
          "Enter a search"
        )}
      </div>
    </>
  );
}
