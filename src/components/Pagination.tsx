import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { CocktailCard } from "./CocktailCard";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function Pagination({ data }: IPaginationDataProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const currentItems = data.slice(startIndex, startIndex + 10);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
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
