import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inrgredientCardPropTypes } from '../../../utils/proptypes';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from "react-dnd";

export const IngredientCard = React.memo(
    ({ food }) => {
        IngredientCard.propTypes = inrgredientCardPropTypes;
        const burger = useSelector(store => store.burger);
        const dispatch = useDispatch();
        const [{ isDrag }, dragRef] = useDrag({
            type: "food",
            item: food
        });

        const [count, setCount] = useState(null);

        useEffect(() => {
            setCount(burger.recipe.reduce(function (amount, f) {
                return f._id === food._id ? amount + 1 : amount
            }, 0))
        }, [burger, food]);

        return (
            <li className={iStyles.card} ref={dragRef}>
                <img className={iStyles.cardImage} src={food.image} alt={food.name} />
                <div className={iStyles.cardText} onClick={() => dispatch({ type: "ingredient/openIngredient", payload: food })}>
                    <div className={iStyles.cardPrice}>
                        <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                        <CurrencyIcon type={"primary"} />
                    </div>
                    <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                </div>
                <div className={iStyles.count}>
                    {!!count && <Counter count={count} size="default" />}
                </div>
            </li>
        )
    }
);