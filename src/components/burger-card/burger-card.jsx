import React from 'react';
import bStyles from './burger-card.module.css';
import { burgerCardPropTypes } from '../../utils/proptypes';
import { useLocation, Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

export const BurgerCard = React.memo(
    ({ burger }) => {
        const location = useLocation();
        BurgerCard.propTypes = burgerCardPropTypes;
        const dispatch = useDispatch();
        const { _id, number, name, ingredients, total, createdAt } = burger;

        return (
            <Link to={{
                pathname: `${location.pathname}/${_id}`,
                state: { background: location }
            }}>
                <div className={bStyles.card} onClick={() => dispatch({ type: "burgerOrder/openOrder", payload: burger })}>
                    <div className={bStyles.cardHeader}>
                        <BurgerNumber number={number} />
                        <BurgerTime time={createdAt} />
                    </div>
                    <p className="text text_type_main-medium">{name}</p>

                    <div className={bStyles.cardFooter}>
                        <CardFoods images={ingredients.map(ing => ing.image)} />
                        <BurgerPrice total={total} />
                    </div>

                </div>
            </Link>
        )

    }
)

const CardFoods = ({ images }) => {
    const bigBurger = images.length > 6;
    const items = [...images].reverse(); //reverse & reverse-row for right negative margin

    return (
        <div className={bStyles.cardImages}>
            {items.map((item, i) =>
                i < 6 && <BurgerIngredientImage
                    key={i}
                    image={item}
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

        let diffDays = curDay >= burgerDay ? curDay - burgerDay : prevMonthDays + curDay - burgerDay;
        const timeLabel = diffDays === 0 ? "Сегодня " :
            diffDays === 1 ? "Вчера " :
                diffDays % 10 === 2 || diffDays % 10 === 3 || diffDays % 10 === 4 ? diffDays + " дня назад "
                    : diffDays % 10 === 1 ? + " день назад"
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

export const BurgerIngredientImage = ({ image, text, type }) => {
    return (
        <div className={bStyles.imageContainer} style={type === "row" ? { marginRight: "-16px" } : {}}>
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