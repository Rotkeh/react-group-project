// Prop för att returnera den hämtade drinken till förälder-komponeneten
interface ButtonProps {
  // onNewDrink: (drink: ICocktail) => void;
  fetchCocktail: () => void;
}

export function NewCocktailButton({ fetchCocktail }: ButtonProps) {
  return (
    <button onClick={fetchCocktail}>
      {/*Knappen kommer nu att trigga fetchCocktail när användaren klickar*/}
      Get me a new drink!
    </button>
  );
}
