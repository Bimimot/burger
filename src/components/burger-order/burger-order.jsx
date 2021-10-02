
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import oStyles from './burger-order.module.css';
import { BurgerNumber, BurgerPrice, BurgerTime, BurgerIngredientImage } from "../burger-card/burger-card";
import { ScrollBox } from '../scrollbox/scrollbox';

export const BurgerOrder = ({ order }) => {
    console.log("ORDER", order);
    const { name, _id, status, ingredients, createdAt, total } = order;

    return (
        <div className={oStyles.order}>
            <div className={oStyles.header}>
                <BurgerNumber number={_id} />
            </div>

            <h1 className="text text_type_main-medium">{name}</h1>

            <span className="text text_type_main-default mt-3 mb-10" style={{ color: "var(--text-success-color" }}>
                {status === "done" ? "Выполнен" : "Готовится"}
            </span>

            <BurgerOrderRecipe ingredients={ingredients} />

            <div className={oStyles.footer}>
                <BurgerTime time={createdAt} />
                <BurgerPrice total={total} />
            </div>
        </div>
    )
}

const BurgerOrderRecipe = ({ ingredients }) => {
    return (
        <div className={oStyles.recipe}>
            <h3 className="text text_type_main-medium mb-6 mt-5">Состав</h3>
            <ScrollBox id={"recipe"}>
                <div className={oStyles.ingredients}>
                    {ingredients.map((ingredient,i) =>
                        <OrderIngredient key={ingredient+i} ingredientId={ingredient} />
                    )}
                </div>
            </ScrollBox>
        </div>
    )
}

const OrderIngredient = ({ ingredientId }) => {
    const foods = useSelector(store => store.foods.items);
    const [ingredient] = useState(foods.find(f => f._id === ingredientId));

    return (
        <div className={oStyles.ingredient}>
            <div className={oStyles.about}>
                <BurgerIngredientImage ingredientId={ingredientId} />
                <p className="text text_type_main-default ml-4">{ingredient.name}</p>
            </div>
            <BurgerPrice total={`${ingredient.type === "bun" ? "2" : "1"} x ${ingredient.price}`} />
        </div>

    )
}