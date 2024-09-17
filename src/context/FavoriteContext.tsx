import { createContext, ReactNode, useState } from "react";
import { ICocktail, IFavoritesContext } from "../interface";

interface IFavoriteProviderProps {
    children: ReactNode;
}

export const FavoriteContext = createContext<IFavoritesContext>(
    {} as IFavoritesContext
); //Ett kontextobjekt skapas som håller global state som kan delas mellan komponenter.

export function FavoriteProvider({
    children
}: IFavoriteProviderProps) {
    const [favorites, setFavorites] = useState<ICocktail[]>([]);

    const addFavorite = (favorite: ICocktail) => {
        setFavorites((prev) => [...prev, favorite]);
    }

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((f) => f.idDrink !== id))
    };

    return (
      //Alla barnkomponenter kan med providern använda kontexten och hämta eller manipulera favoriterna.
      <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        {children}
      </FavoriteContext.Provider>
    );
}