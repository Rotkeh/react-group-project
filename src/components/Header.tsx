import { Link } from "react-router-dom";
import "../css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/logo_1.png" />
        <h1>Cocktail Database</h1>
      </div>
      <div className="header-links">
        <Link className="header-link" to={"/"}>Home</Link>
        <Link className="header-link" to={"search"}>Search</Link>
      </div>
    </header>
  );
}
