import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { useSearchParams } from "react-router-dom";
import { CachedSearchesContext } from "../context/CachedSearchesContext";
import { Pagination } from "./Pagination";

export function SearchDisplay() {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);

  const [searchParams] = useSearchParams();

  const { cachedSearches, addCachedSearches } = useContext(
    CachedSearchesContext
  );

  useEffect(() => {
    const searchTerm = searchParams.get("s");
    const category = searchParams.get("c");
    const glass = searchParams.get("g");
    const ingredient = searchParams.get("i");
    const alcohol = searchParams.get("a");

    const fetchDataFromSearch = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const result = await response.json();
        addCachedSearches({ search: searchTerm!, cocktails: result.drinks });
        setCocktails(result.drinks);
      } catch (error) {
        console.log(error);
      }
    };

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
          filtered = glassCocktails;
          isSet = true;
        } else {
          filtered = filtered.filter((filteredCocktail) =>
            glassCocktails.some(
              (glassCocktail: ICocktail) =>
                filteredCocktail.idDrink === glassCocktail.idDrink
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
              (alcoholCocktail: ICocktail) =>
                filteredCocktail.idDrink === alcoholCocktail.idDrink
            )
          );
        }
      }
      return filtered;
    };

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

    function filterCocktails() {
      let filtered = cocktails;
      if (category) {
        filtered = filtered.filter(
          (cocktail) => cocktail.strCategory === category
        );
      }
      if (glass) {
        filtered = filtered.filter((cocktail) => cocktail.strGlass === glass);
      }

      function getIngredients(cocktail: ICocktail) {
        let ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktail[`strIngredient${i}` as keyof ICocktail];
          if (ingredient) {
            ingredients.push(ingredient);
          }
        }
        return ingredients;
      }

      if (ingredient) {
        filtered = filtered.filter((cocktail) =>
          getIngredients(cocktail).includes(ingredient)
        );
      }
      if (alcohol) {
        filtered = filtered.filter(
          (cocktail) => cocktail.strAlcoholic === alcohol
        );
      }
      return filtered;
    }

    const runSearch = async () => {
      if (searchTerm) {
        const cached = cachedSearches.find(
          (cachedSearch) => cachedSearch.search === searchTerm
        );
        if (cached) {
          setCocktails(cached.cocktails);
        } else {
          await fetchDataFromSearch();
        }
        if (category || glass || ingredient || alcohol) {
          setCocktails(filterCocktails);
        }
      } else if (category || glass || ingredient || alcohol) {
        const filteredCocktails = await filterBySelections(); // Use 'await' here
        setCocktails(filteredCocktails); // This will now be the resolved array
      } else {
        setCocktails([]);
        console.log("enter search");
      }
    };

    runSearch(); // Call the async function
  }, [searchParams]);
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
