
import React, { FC } from 'react';
import oStyles from './burger-order.module.css';
import { BurgerNumber, BurgerPrice, BurgerTime, BurgerIngredientImage } from "../burger-card/burger-card";
import { ScrollBox } from '../scrollbox/scrollbox';
import { TorderProps, TorderRecipeProps, TorderIngredientProps } from '../../utils/proptypes';


export const BurgerOrder: FC<TorderProps> = ({ order }) => {

    const { name, number, _id, status, ingredients, createdAt, total } = order;

    return (
        <div className={oStyles.order}>
            <div className={oStyles.header}>
                <BurgerNumber number={number} />
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

const BurgerOrderRecipe: FC<TorderRecipeProps> = ({ ingredients }) => {
    return (
        <div className={oStyles.recipe}>
            <h3 className="text text_type_main-medium mb-6 mt-5">Состав</h3>
            <ScrollBox id={"recipe"}>
                <div className={oStyles.ingredients}>
                    {ingredients.map((ingredient, i) =>
                        <OrderIngredient key={ingredient._id + i} ingredient={ingredient} />
                    )}
                </div>
            </ScrollBox>
        </div>
    )
}

const OrderIngredient: FC<TorderIngredientProps> = ({ ingredient }) => {
    const total: number = ingredient.type === "bun" ? 2 : 1 * ingredient.price;
    return (
        <div className={oStyles.ingredient}>
            <div className={oStyles.about}>
                <BurgerIngredientImage image={ingredient.image} />
                <p className="text text_type_main-default ml-4">{ingredient.name}</p>
            </div>
            <BurgerPrice total={total} />
        </div>

    )
}