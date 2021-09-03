import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useContext, useState, useEffect } from 'react';
import { inrgredientCardPropTypes } from '../../../utils/proptypes';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../../utils/context';

export const IngredientCard = React.memo(
    ({ food, showDetails }) => {
        IngredientCard.propTypes = inrgredientCardPropTypes;
        const [burger, dispatchBurger] = useContext(BurgerContext);
        const [currencyType, setCurrencyType] = useState("primary");
        const [count, setCount] = useState(null);

        useEffect(() => {
            setCount(burger.recipe.reduce(function (amount, f) {
                return f._id === food._id ? amount + 1 : amount
            }, 0))
        }, [burger, food]);

        return (
            <li className={iStyles.card}
                onMouseEnter={() => setCurrencyType("success")}
                onMouseLeave={() => setCurrencyType("primary")}
                onClick={() => showDetails(food)}
            >
                <img src={food.image} alt={food.name} />
                <div className={iStyles.cardPrice}>
                    <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                    <CurrencyIcon type={currencyType} />
                </div>
                <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                <div className={iStyles.count}>
                    {!!count && <Counter count={count} size="default" />}
                </div>
            </li>
        )
    }
);