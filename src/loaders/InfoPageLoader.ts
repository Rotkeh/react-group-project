import { LoaderFunctionArgs } from "react-router-dom";

export const fetchDataFromId = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    return result.drinks[0];
  } catch (error) {
    console.log(error);
    alert("failed to fetch data from the api");
  }
};
