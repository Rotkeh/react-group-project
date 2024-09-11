import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { CocktailCard } from "./CocktailCard";
import { useNavigate } from "react-router-dom";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function Pagination({ data }: IPaginationDataProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const currentItems = data.slice(startIndex, startIndex + 10);

  const handleClick = (cocktail: ICocktail) => {
    navigate(`/info/${cocktail.idDrink}`);
  };

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
    <div className="pagination">
      <div className="pagination-navigation">
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
      </div>
      <div className="cards">
        {currentItems.map((cocktail) => (
          <div key={cocktail.idDrink} onClick={() => handleClick(cocktail)}>
            <CocktailCard cocktail={cocktail} />
          </div>
        ))}
      </div>
    </div>
  );
}
