import { ICocktail } from "../interface";
import { fetchCocktail } from "../loaders/LandingPageLoader";

// Prop för att returnera den hämtade drinken till förälder-komponeneten
interface ButtonProps {
  buttonFunction: (cocktail: ICocktail) => void;
}

export function NewCocktailButton({ buttonFunction }: ButtonProps) {
  async function setNewRandom() {
    const cocktail = await fetchCocktail(); // Hämta en ny cocktail från API via loadern
    buttonFunction(cocktail); // Skicka tillbaka cocktailen till föräldern (Home.tsx) som ett argument
  }

  return (
    <button className="new-cocktail-button" onClick={setNewRandom}>
      {/*Knappen kommer nu att trigga fetchCocktail när användaren klickar*/}
      Get me a new drink!
    </button>
  );
}
