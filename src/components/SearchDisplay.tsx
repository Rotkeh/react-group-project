/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { useSearchParams } from "react-router-dom";
import { CachedSearchesContext } from "../context";
import { Pagination, InfiniteScroll } from "../components";

export function SearchDisplay() {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]); // Håller cocktails-resultaten, från API eller cachade

  const [searchParams] = useSearchParams(); // Hämtar de aktuella sökparametrarna från URL (angavs i SearchForm)

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [pagination, setPagination] = useState<boolean>(true); // Paginering eller visa alla i infinite scroll

  const { cachedSearches, addCachedSearches } = useContext(CachedSearchesContext); // Får tillgång till cachade sökningar, eller lägger till mer

  useEffect(() => {
    const searchTerm = searchParams.get("s"); //Parametrarna hämtas som objekt för att få cocktailnamnet
    const category = searchParams.get("c");
    const glass = searchParams.get("g");
    const ingredient = searchParams.get("i");
    const alcohol = searchParams.get("a");

    // Om användaren har angett ett cocktailnamn i sök-input
    const fetchDataFromSearch = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}` // Använder searchTerm från URL-parametrarna för att hämta matchad sökning
        );
        const result = await response.json();
        addCachedSearches({ search: searchTerm!, cocktails: result.drinks }); // Cacha sökningen
        return result.drinks; // Uppdatera state-variabeln cocktails - Spara resultaten
      } catch (error) {
        console.log(error);
        alert("failed to fetch data from the api");
      }
    };

    /**
     * Fetches a list of drinks from TheCocktailDB API based on a filter.
     * @param {string} item - The value to filter by (e.g., ingredient or category).
     * @param {string} by - The filter type (e.g., 'i' for ingredient, 'c' for category).
     * @returns An array of cocktail objects
     */

    //Om användaren angett filter för sökning
    const fetchDataByFilter = async (item: string, by: string) => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${by}=${item}`
        );
        const result = await response.json();
        return result.drinks;
      } catch (error) {
        console.log(error);
        alert("failed to fetch data from the api");
      }
    };

    /**
     * Filters cocktails based on multiple selections: category, glass, ingredient, and alcohol.
     * Applies filters in sequence, refining the results with each additional filter.
     * @returns An array of the filtered cocktail objects
     *
     * @description The function applies filtering in the following order:
     * 1. **Category**: If a category is selected, it fetches cocktails by category.
     * 2. **Glass**: If a glass is selected, it refines the results based on glass.
     * 3. **Ingredient**: If an ingredient is selected, it refines the results further based on the ingredient.
     * 4. **Alcohol**: Finally, it refines the results based on alcohol content.
     *
     * If multiple filters are applied, the results will contain only cocktails that match all selected criteria.
     */

    //Filtrera efter kategori (när användaren inte angett sökord)
    const filterBySelections = async () => {
      let isSet = false;
      let filtered: ICocktail[] = [];
      // Om en kategori är vald, hämta cocktails med den kategorin
      if (category) {
        filtered = await fetchDataByFilter(category, "c");
        isSet = true; // Indikerar att ett filter har använts
      }

      if (glass) {
        const glassCocktails = await fetchDataByFilter(glass, "g");
        if (!isSet) {
          // Om detta är det första filtret som tillämpas (isSet är fortfarande false), sätts filtered till resultatet från glasfiltreringen och vi sätter isSet till true
          filtered = glassCocktails;
          isSet = true;
        } else {
          // Om en kategori redan valts, behåll endast de cocktails som matchar både kategori och glas. Detta görs genom att jämföra varje cocktail baserat på dess idDrink
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

    //Funktion som används när användaren har angett ett sökord (cocktailnamn) och har valt ett eller flera filter.
    /**
     * Filters an array of cocktail objects based on selected criteria: category, glass type, ingredient, and alcohol content.
     * @description The function applies the following filters sequentially:
     * - **Category**: Filters cocktails by their category.
     * - **Glass**: Filters cocktails by their glass type.
     * - **Ingredient**: Filters cocktails by any of their ingredients.
     * - **Alcohol content**: Filters cocktails by their alcohol content.
     *
     * @returns An array of filtered cocktail objects that match the applied filters.
     */
    function filterCocktails(cocktailsToFilter: ICocktail[]) {
      let filtered = cocktailsToFilter;
      //if we have a category, filter out the cocktails that does not match it
      if (category) {
        filtered = filtered.filter((cocktail) => cocktail.strCategory === category);
      }
      if (glass) {
        filtered = filtered.filter((cocktail) => cocktail.strGlass === glass);
      }

      // returns an array of all the ingredients of a cocktails
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

    /**
     * Executes a search for cocktails based on a search term and various filters (category, glass, ingredient, alcohol).
     * @description The function handles searching for cocktails as follows:
     * - If a search term is provided:
     *   1. It checks if there is a cached result for the search term.
     *   2. If cached results are found, it uses them; otherwise, it fetches new data from the API.
     *   3. If additional filters (category, glass, ingredient, alcohol) are selected, it applies them to the results.
     * - If no search term is provided but filters are selected, it fetches filtered results.
     * - If neither a search term nor filters are provided, it clears the cocktail list.
     */
    const runSearch = async () => {
      setIsLoaded(false);
      //om en sökterm finns
      if (searchTerm) {
        const cached = cachedSearches.find((cachedSearch) => cachedSearch.search === searchTerm);
        if (cached) {
          // Använd cachade resultat om de finns
          if (category || glass || ingredient || alcohol) {
            setCocktails(filterCocktails(cached.cocktails)); //Om ett eller flera filter är valda så filtrera de cachade cocktailsen
          } else {
            setCocktails(cached.cocktails); // Annars hämta alla från cachet
          }
        } else {
          if (category || glass || ingredient || alcohol) {
            setCocktails(filterCocktails(await fetchDataFromSearch())); //Om ett eller flera filter är valda så filtrera sökningen baserat på dom
          } else {
            setCocktails(await fetchDataFromSearch()); // Annars hämta från API:et
          }
        }
        setTimeout(() => setIsLoaded(true), 1000);
      } else if (category || glass || ingredient || alcohol) {
        setCocktails(await filterBySelections()); //Om det inte fanns någon sökterm men ett eller flera filter var valda så hämta data från API:et baserat på dessa
        setTimeout(() => setIsLoaded(true), 1000);
      } else {
        setCocktails([]); //Om ingen sökterm eller något filter var valt så töm cocktails
      }
    };

    runSearch();
  }, [searchParams]); // Kör när sökparametrarna (i URL:en) ändras
  return (
    <>
      <section className="searchDisplay">
        {isLoaded && cocktails && cocktails.length > 0 ? (
          <>
            <p className="results-found">
              <strong>Results found:</strong> {cocktails.length}
            </p>
            <button
              onClick={() => {
                setPagination((prev) => !prev);
              }}
            >
              {pagination ? "Show all results" : "Show pagination"}
            </button>
            {pagination ? <Pagination data={cocktails} /> : <InfiniteScroll data={cocktails} />}
          </>
        ) : searchParams.size > 0 ? (
          searchParams.get("s") ||
          searchParams.get("c") ||
          searchParams.get("g") ||
          searchParams.get("i") ||
          searchParams.get("a") ? (
            isLoaded ? (
              <p>Search did not match any results</p>
            ) : (
              <div className="loader"></div>
            )
          ) : (
            <p>Enter a search or selection</p>
          )
        ) : (
          <p>Enter a search</p>
        )}
      </section>
    </>
  );
}
