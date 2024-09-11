import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { CocktailCard } from "./CocktailCard";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function Pagination({ data }: IPaginationDataProps) {
  const [currentPage, setCurrentPage] = useState(1); //Sidan är 1 från början

  useEffect(() => {
    setCurrentPage(1);
  }, [data]); //Körs varje gång data ändras, t.ex. när ny sökning görs. Då återställs currentPage till 1.

  const totalPages = Math.ceil(data.length / 10); //Beräkning hur många sidor som kommer finnas totalt - data (antalet cocktails) / 10. Math.ceil för att avrunda uppåt

  const startIndex = (currentPage - 1) * 10;
  const currentItems = data.slice(startIndex, startIndex + 10); // Bara de cocktails (slice) som ska visas på aktuella sidan

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); //Uppdaterar currentPage till nytt sidnummer
  };

  const getIndexButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "activeIndex" : ""}
        >
          {i}
        </button>
      );
    }
    return <div>{buttons}</div>;
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {getIndexButtons()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <ul>
        {currentItems.map((cocktail) => (
          <CocktailCard cocktail={cocktail} />
        ))}
      </ul>
    </div>
  );
}
