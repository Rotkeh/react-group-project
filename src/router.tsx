import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App } from "./components";
import { Home, SearchPage, CocktailInfo, Favorites } from "./pages";
import { NotFound } from "./pages/NotFound";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} />
      <Route element={<SearchPage />} path="search" />
      <Route element={<Favorites />} path="favorites" />
      <Route path="info/:id" element={<CocktailInfo />}/>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
