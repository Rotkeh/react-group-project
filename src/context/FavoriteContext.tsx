import { createContext, ReactNode, useState } from "react";
import { ICocktail, IFavoritesContext } from "../interface";

interface IFavoriteProviderProps {
    children: ReactNode;
}

export const FavoriteContext = createContext<IFavoritesContext>(
    {} as IFavoritesContext
);

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
        <FavoriteContext.Provider value={{favorites, addFavorite, removeFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}