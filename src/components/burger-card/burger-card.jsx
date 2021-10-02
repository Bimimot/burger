import React, { useState } from 'react';
import bStyles from './burger-card.module.css';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

export const BurgerCard = React.memo(
    ({ burger }) => {
        const isLoaded = useSelector(store => store.foods.isLoaded);
        const location = useLocation();
        const dispatch = useDispatch();

        return (
            <Link to={{
                pathname: `${location.pathname}/${burger._id}`,
                state: { background: location }
            }}>
                <div className={bStyles.card} onClick={() => dispatch({ type: "burgerOrder/openOrder", payload: burger })}>
                    <div className={bStyles.cardHeader}>
                        <BurgerNumber number={burger.number} />
                        <BurgerTime time={burger.createdAt} />
                    </div>
                    <p className="text text_type_main-medium">{burger.name}</p>

                    {isLoaded &&
                        <div className={bStyles.cardFooter}>
                            <CardFoods ingredients={burger.ingredients} />
                            <BurgerPrice total={burger.total} />
                        </div>
                    }
                </div>
            </Link>
        )

    }
)


const CardFoods = ({ ingredients }) => {
    const bigBurger = ingredients.length > 6;
    const items = [...ingredients].reverse(); //reverse & reverse-row for right negative margin

    return (
        <div className={bStyles.cardImages}>
            {items.map((ingredient, i) =>
                i < 6 && <BurgerIngredientImage
                    ingredientId={ingredient}
                    text={(i === 0 && bigBurger) ? "+" + (items.length - 5) : ""}
                    type={"row"}
                />)
            }
        </div>
    )
}


//--design components--//

export const BurgerTime = ({ time }) => {
    const curTime = () => {
        const burgerDate = new Date(time);
        const burgerDay = burgerDate.getDate();
        const burgerMonth = burgerDate.getMonth();
        const burgerYear = burgerDate.getFullYear();
        const curDay = new Date().getDate();
        const prevMonthDays = new Date(burgerYear, burgerMonth + 1, 0).getDate();

        let diffDays = curDay > burgerDay ? curDay - burgerDay : prevMonthDays + curDay - burgerDay;
        const timeLabel = diffDays === 0 ? "Сегодня " :
            diffDays === 1 ? "Вчера " :
                diffDays % 10 === 2 || diffDays % 10 === 3 || diffDays % 10 === 4 ? diffDays + " дня назад "
                    : diffDays + " дней назад ";
        const zoneLabel = " i-GMT" + burgerDate.toTimeString().substring(12, 18).replaceAll(0, "");

        let timeString =
            timeLabel +
            burgerDate.getHours() + ":" +
            burgerDate.getMinutes() +
            zoneLabel;
        return timeString
    };

    return (
        <p className="text text_type_main-default" style={{ color: "var(--text-secondary-color)" }}>{curTime()}</p>
    )
}

export const BurgerIngredientImage = ({ ingredientId, text, type }) => {
    const foods = useSelector(store => store.foods.items);
    const [image] = useState(foods.find(f => f._id === ingredientId).image);

    return (
        <div className={bStyles.imageContainer} style={type === "row" ? { marginRight: "-20px" } : {}}>
            <div
                className={!!text ? bStyles.cardImageBlur : bStyles.cardImage}
                style={{ backgroundImage: "url(" + image + ")" }}
            >
                {!!text &&
                    <span className="text text_type_digits-default" style={{ zIndex: "100" }}>
                        {text}
                    </span>
                }
            </div>
        </div>
    )
}

export const BurgerPrice = ({ total }) =>
    <div className={bStyles.cardTotal}>
        <span className="text text_type_digits-default mr-2">{total}</span>
        <CurrencyIcon />
    </div>;

export const BurgerNumber = ({ number }) =>
    <p className="text text_type_digits-default">
        #{number}
    </p>;