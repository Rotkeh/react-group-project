import { LoaderFunctionArgs } from "react-router-dom";

export const fetchDataFromName = async ({ params }: LoaderFunctionArgs) => {
  const name = params.name;
  try {
    //För ingrediensinformation: Detta anrop hämtar all info om en ingrediens, som namn, typ, alkoholhalt osv.
    const response1 = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
    );
    //För cocktails som innehåller ingrediensen: Det andra API-anropet hämtar cocktails som har den här ingrediensen.
    const response2 = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
    );
    const ingredient = (await response1.json()).ingredients[0];
    const drinks = (await response2.json()).drinks;
    return { ingredient, drinks };
  } catch (error) {
    console.log(error);
    alert("failed to fetch data from the api");
  }
};
