import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useDispatch } from 'react-redux';
import { inrgredientCardPropTypes } from '../../../utils/proptypes';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";

export const IngredientCard = React.memo(
    ({ food }) => {
        IngredientCard.propTypes = inrgredientCardPropTypes;
        const dispatch = useDispatch();
        const [{ isDrag }, dragRef] = useDrag({
            type: "food",
            item: food
        });

        return (
            <li className={iStyles.card} onClick={() => dispatch({ type: "ingredient/openIngredient", payload: food })}>
                <img className={iStyles.cardImage} src={food.image} alt={food.name} ref={dragRef}/>
                <div className={iStyles.cardText}>
                    <div className={iStyles.cardPrice}>
                        <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                        <CurrencyIcon type={"primary"} />
                    </div>
                    <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                </div>
                <div className={iStyles.count}>
                    {!!food.count && <Counter count={food.count} size="default" />}
                </div>
            </li>
        )
    }
);