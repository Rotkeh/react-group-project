export function About() {
    return (
        <>
            <main className = "body">
                <h3>Landing page</h3>
                <p id="landingPageInfo">This page presents a random drink, shown in a card.
                    To change to a new random drink, press the button "Get me a new drink!"
                    If you want to add the drink to your favorite list, click on the heart symbol.
                    If you want to see more information about a specific drink, click anywhere inside the drink card.
                </p>
                <h3>Search Page</h3>
                <p id="searchPageInfo">This page lets you search for a drink.
                    The search can be made in several different ways.
                    1. Enter a part of the name of the drink into the input field, if you know the name of the drink you are searching for.
                    2. Choose between category - glass - ingredient if you want a more organized search.
                    If you want to see more information about a specific drink, click anywhere inside the drink card.
                </p>
                <h3>Cocktailinfo Page</h3>
                <p id="cocktailPageInfo">
                    In this page you can find extended information about a specific drink.
                    You can find a list of ingredients, category of drink, type of glass.
                    Also the drink is listed as Alcoholic/Non alcoholic
                </p>
                <h3>Favorite Page</h3>
                <p id="favoritePageinfo">
                    This page shows your created list of favorite drinks. 
                    You can choose to remove drinks from the list by clinking on the heart symbol.
                    Filled heart symbol, means the drink is in the favorite list. 
                    When you click to remove, the drink disappears from the favorite list.
                </p>
                

            </main>
        </>
    );
}
