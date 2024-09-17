import { ICocktail } from "../interface";
import { fetchCocktail } from "../loaders/LandingPageLoader";

// Prop för att returnera den hämtade drinken till förälder-komponeneten
interface ButtonProps {
  buttonFunction: (cocktail: ICocktail) => void;
}

export function NewCocktailButton({ buttonFunction }: ButtonProps) {
  async function setNewRandom() {
    const cocktail = await fetchCocktail();
    buttonFunction(cocktail);
  }

  return (
    <button className="new-cocktail-button" onClick={setNewRandom}>
      {/*Knappen kommer nu att trigga fetchCocktail när användaren klickar*/}
      Get me a new drink!
    </button>
  );
}
