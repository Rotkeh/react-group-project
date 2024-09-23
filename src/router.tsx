import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { Home, SearchPage, CocktailInfo, Favorites, About } from "./pages";
import { NotFound } from "./pages/NotFound";
import { fetchCocktail } from "./loaders/LandingPageLoader";
import { fetchDataFromId } from "./loaders/InfoPageLoader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} loader={fetchCocktail} />
      {/* Anropar loadern för att hämta en cocktail från API */}
      <Route element={<SearchPage />} path="search" />
      <Route element={<Favorites />} path="favorites" />
      <Route element={<About />} path="about" />
      <Route
        path="info/:id"
        element={<CocktailInfo />}
        loader={fetchDataFromId}
        errorElement={<NotFound />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
