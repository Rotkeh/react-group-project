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
  const [loadData, setLoadData] = useState<ICocktail[]>(data.slice(0, 12));

  const handleClick = (
    cocktail: ICocktail,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.className !== "material-icons favoriteButton")
      navigate(`/info/${cocktail.idDrink}`);
  };

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

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
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 300));
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 300));
  });

  useEffect(() => {
    if (loading === true) {
      setLoadData((prevData) => [
        ...prevData,
        ...data.slice(loadData.length, loadData.length + 4),
      ]);
      setLoading(false);
    }
  }, [loading]);

  return (
    <nav className="pagination">
      <section className="cards">
        {loadData.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="cocktail-card"
            onClick={(e) => handleClick(cocktail, e)}
          >
            <CocktailCard
              showSeeMore={false}
              cocktail={cocktail}
              detailed={false}
            />
          </div>
        ))}
      </section>
      <button>Till toppen</button>
    </nav>
  );
}
