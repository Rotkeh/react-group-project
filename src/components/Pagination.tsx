import { useState } from "react";
import { ICocktail } from "../interface";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function Pagination({ data }: IPaginationDataProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const currentItems = data.slice(startIndex, startIndex + 10);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <ul>
        {currentItems.map((cocktail) => (
          <h2 key={cocktail.idDrink}>{cocktail.strDrink}</h2>
        ))}
      </ul>
    </div>
  );
}
