import { Link } from "react-router-dom";
import "../css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/logo.jpg" />
        <h1>Cocktail Database</h1>
      </div>
      <div className="header-links">
        <Link to={"/"}>Home</Link>
        <Link to={"search"}>Search</Link>
      </div>
    </header>
  );
}
