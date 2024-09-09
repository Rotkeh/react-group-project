import { Link } from "react-router-dom";

export function Footer() {
    return (
        <header>
            <h1>Footer</h1>
            <Link to={"/"}>Footer-Home</Link>
            <Link to={"search"}>Footer-Search</Link>
        </header>
    )
}