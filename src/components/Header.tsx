import { Link } from "react-router-dom";
import "../css";
import logo from "../assets/logo_1.png";

export function Header() {
  return (
    <header className="header">
      <Link className="header-link" to={"/"}>
        <div className="logo">
          <img src={logo} />
          <h1>Cocktail Database</h1>
        </div>
      </Link>

      <nav className="header-links">
        <Link className="header-link hover-effect" to={"/"}>
          Home
        </Link>
        <Link className="header-link hover-effect" to={"search"}>
          Search
        </Link>
        <Link className="header-link hover-effect" to={"favorites"}>
          Favorites
        </Link>
      </nav>
    </header>
  );
}
