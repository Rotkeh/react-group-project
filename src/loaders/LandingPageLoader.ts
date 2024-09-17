const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export const fetchCocktail = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.drinks[0];

    // skicka tillbaka drinken till föräldern
  } catch (error) {
    console.error("Error fetching cocktail", error);
  }
};
