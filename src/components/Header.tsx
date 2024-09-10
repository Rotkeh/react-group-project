import { Link } from "react-router-dom";
import "../css";

export function Header() {
    return (
        <header className="header">
            <h1>Cocktail Database</h1>
            <Link to={"/"}>Home</Link>
            <Link to={"search"}>Search</Link>
        </header>
    )
}