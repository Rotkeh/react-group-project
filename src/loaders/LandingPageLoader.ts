const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
//Loadern hämtar cocktail-datan när användaren navigerar till "Home"-sidan.
//useLoaderData i Home.tsx hämtar och tillhandahåller den hämtade drinken till komponenten.

export const fetchCocktail = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.drinks[0]; // Den första drinken från API-svaret
  } catch (error) {
    console.error("Error fetching cocktail", error);
    alert("failed to fetch data from the api");
  }
};
