import { useNavigate } from "react-router-dom";
import { ICocktail } from "../interface";
import { CocktailCard } from "./CocktailCard";
import { useEffect, useState } from "react";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function InfiniteScroll({ data }: IPaginationDataProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadData, setLoadData] = useState<ICocktail[]>(data.slice(0, 12)); // Cocktaillistan som visas på sidan. Den startar med de första 12 objekten från data. data.slice(0, 12) tar de första 12 cocktail-objekten från arrayen och sätter dem i loadData.

  //Om du klickar på en cocktail, och det inte är på en favorit-knapp, navigerar du till en sida som visar detaljer om just den cocktailen baserat på dess ID.
  const handleClick = (cocktail: ICocktail, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.className !== "material-icons favoriteButton") navigate(`/info/${cocktail.idDrink}`);
  };

  // Kollar om du nästan är längst ner på sidan (300px från slutet). Om så är fallet, sätter den loading till true, vilket triggar inladdning av mer data.
  const handleScroll = () => {
    if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
      setLoading(true);
    }
  };

  // Funktion som förhindrar att handleScroll körs för ofta (t.ex. varje gång du skrollar en pixel). debounce låter funktionen vänta 300 millisekunder (se useEffect nedan) innan den körs igen, vilket förbättrar prestanda.
  function debounce(func: () => void, delay: number) {
    let timeoutId: number;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  }

  useEffect(() => {
    setLoadData(data.slice(0, 12));
  }, [data]); //Varje gång data ändras (när nya cocktails hämtas från API) uppdateras loadData med de första 12 objekten

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 300));
    return () => window.removeEventListener("scroll", debounce(handleScroll, 300));
  }, []); // Event-listener för att lyssna på när användaren skrollar, anropar handleScroll med en fördröjning (300ms). När komponenten avmonteras tas också event-listenern bort.

  useEffect(() => {
    if (loading === true) {
      setLoadData((prevData) => [...prevData, ...data.slice(loadData.length, loadData.length + 4)]);
      setLoading(false); //loading sätts tillbaka till false när uppdateringen är klar, vilket stoppar ytterligare laddningar tills användaren skrollar igen
    }
  }, [loading]); // När loading blivit true, laddas ytterligare 4 cocktails in från data och läggs till i loadData. Efter det sätts loading tillbaka till false

  return (
    <nav className="pagination">
      <section className="cards">
        {loadData.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="cocktail-card"
            onClick={(e) => handleClick(cocktail, e)}
          >
            <CocktailCard showSeeMore={false} cocktail={cocktail} detailed={false} />
          </div>
        ))}
      </section>
      <button
        className="back-to-top-btn"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Back to top
      </button>
    </nav>
  );
}
