import { useState } from "react"
import { IIngredient, IngredientLoaderDto } from "../interface"
import { IngredientCard } from "../components/IngredientCard";
import { useLoaderData } from "react-router-dom";


export function IngredientPage() {
    
    const {ingredientInfo, drinks} = useLoaderData() as IngredientLoaderDto;
    const [ingredient] = useState<IIngredient>(ingredientInfo);
    const IMG_URL = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}.png`
    const [imgUrl] = useState<string>(IMG_URL);
    
    return (
        <main>{ingredient && <IngredientCard ingredient={ingredient!} img={imgUrl} cocktails={drinks}/>}</main>
    )
}


