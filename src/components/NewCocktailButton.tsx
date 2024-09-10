import { useState } from "react";
import { ICocktail } from "../interface";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Prop för att returnera den hämtade drinken till förälder-komponeneten

interface ButtonProps {
    onNewDrink: (drink: ICocktail) => void;
}

export function NewCocktailButton({onNewDrink}: ButtonProps) {
    const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);

        // läs in drinkar från APi (eller från useContext?)
        const fetchCocktail = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setRandomCocktail(data.drinks[0]);

                // skicka tillbaka drinken till föräldern
                onNewDrink(randomCocktail!);
            } catch (error) {
                console.error("Error fetching cocktail", error);
            }
        };
          

    return (
        
        <button onClick={fetchCocktail}>
            
{/*Knappen kommer nu att trigga fetchCOcktail när användaren klickar*/}
        New Drink!</button>
    );
}
