import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { CocktailCard } from "../components";
import { useNavigate } from "react-router-dom";

interface IPaginationDataProps {
  data: ICocktail[];
}

export function Pagination({ data }: IPaginationDataProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [data]); // Every time data changes(we get a new search) the currentPage is reset to 1

  const totalPages = Math.ceil(data.length / 10); //Beräkning hur många sidor som kommer finnas totalt - data (antalet cocktails) / 10. Math.ceil för att avrunda uppåt

  const startIndex = (currentPage - 1) * 10; // Beräknar indexet för den första cocktailen på den aktuella sidan. Första sidan har index 0-9, andra sidan har index 10-19 osv.
  const currentItems = data.slice(startIndex, startIndex + 10); // Tar en slice av data-arrayen och innehåller bara de cocktails som ska visas på den aktuella sidan.

  //when a cocktail is clicked navigate to the info page of that cocktail
  const handleClick = (cocktail: ICocktail, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.className !== "material-icons favoriteButton") navigate(`/info/${cocktail.idDrink}`);
  };

  // returns the index buttons depending on the amount of results
  const getIndexButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "activeIndex" : ""}
        >
          {i}
        </button>
      );
    }
    return <div className="page-button">{buttons}</div>;
  };

  return (
    <nav className="pagination">
      <div className="pagination-navigation">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {getIndexButtons()}

        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      <section className="cards">
        {currentItems.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="cocktail-card"
            onClick={(e) => handleClick(cocktail, e)}
          >
            <CocktailCard showSeeMore={false} cocktail={cocktail} detailed={false} />
          </div>
        ))}
      </section>
      <section className="pagination-navigation">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </section>
    </nav>
  );
}
