// Prop för att returnera den hämtade drinken till förälder-komponeneten
interface ButtonProps {
  fetchCocktail: () => void;
}

export function NewCocktailButton({ fetchCocktail }: ButtonProps) {
  return (
    <button className="new-cocktail-button" onClick={fetchCocktail}>
      {/*Knappen kommer nu att trigga fetchCocktail när användaren klickar*/}
      Get me a new drink!
    </button>
  );
}
