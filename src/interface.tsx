type Nullable = string | null;
export interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: Nullable;
  strTags: Nullable;
  strVideo: Nullable;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: Nullable;
  strInstructionsDE: Nullable;
  strInstructionsFR: Nullable;
  strInstructionsIT: Nullable;
  strInstructionsZH_HANS: Nullable;
  strInstructionsZH_HANT: Nullable;
  strDrinkThumb: string;
  strIngredient1: Nullable;
  strIngredient2: Nullable;
  strIngredient3: Nullable;
  strIngredient4: Nullable;
  strIngredient5: Nullable;
  strIngredient6: Nullable;
  strIngredient7: Nullable;
  strIngredient8: Nullable;
  strIngredient9: Nullable;
  strIngredient10: Nullable;
  strIngredient11: Nullable;
  strIngredient12: Nullable;
  strIngredient13: Nullable;
  strIngredient14: Nullable;
  strIngredient15: Nullable;
  strMeasure1: Nullable;
  strMeasure2: Nullable;
  strMeasure3: Nullable;
  strMeasure4: Nullable;
  strMeasure5: Nullable;
  strMeasure6: Nullable;
  strMeasure7: Nullable;
  strMeasure8: Nullable;
  strMeasure9: Nullable;
  strMeasure10: Nullable;
  strMeasure11: Nullable;
  strMeasure12: Nullable;
  strMeasure13: Nullable;
  strMeasure14: Nullable;
  strMeasure15: Nullable;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

export interface CocktailCardProps {
  detailed?: boolean;
  showSeeMore?: boolean;
  cocktail: ICocktail;
}

export interface CachedSearch {
  search: string;
  cocktails: ICocktail[];
}

export interface ICachedSearchesContext {
  cachedSearches: CachedSearch[]; //En array av tidigare sökningar (cachade sökningar)
  addCachedSearches: (search: CachedSearch) => void; //Funktion som lägger till en ny sökning till cachen
}

export interface IFavoritesContext {
  favorites: ICocktail[];
  addFavorite: (favorite: ICocktail) => void;
  removeFavorite: (id: string) => void;
}
