import { IngredientProps } from "../interface";


export function IngredientCard({ingredient, img, cocktails} : IngredientProps) {
  return (
    <main className="cocktail-body">
    <article className="drink-info">
    <img src={img} className="ingredient-img" alt={ingredient.strIngredient}/>
     <h1>{ingredient.strIngredient}</h1> 
     <p className="category"><strong>Type:</strong> {ingredient.strType}</p>
     <p className="category"><strong>Alcoholic:</strong> {ingredient.strAlcohol}</p>
     <p className="category"><strong>Type:</strong> {ingredient.strABV}%</p>
     <p className="category"><strong>Type:</strong></p> <p className="ingredient-description">{ingredient.strDescription}</p> 
     </article>
    </main>
  )
}

// Användare ska kunna se detaljerad information om en ingrediens genom att klicka på den. 
//Informationen ska inkludera namn, beskrivning, alkoholhalt (om tillämpligt), och vilka andra cocktails som innehåller den.
