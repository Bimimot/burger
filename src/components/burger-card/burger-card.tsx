import React, { FC } from 'react';
import bStyles from './burger-card.module.css';
import { TburgerCard, TimageIngredient } from '../../utils/proptypes';

import { useLocation, Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/types/hooks-types';

export const BurgerCard: FC<TburgerCard> = React.memo(
    ({ burger }) => {
        const location = useLocation();
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

const CardFoods: FC<{ images: Array<string> }> = ({ images }) => {
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

export const BurgerTime: FC<{ time: string }> = ({ time }) => {
    const curTime = () => {
        const burgerDate = new Date(time);
        const burgerDay = burgerDate.getDate();
        const burgerMonth = burgerDate.getMonth();
        const burgerYear = burgerDate.getFullYear();
        const curDay = new Date().getDate();
        const prevMonthDays = new Date(burgerYear, burgerMonth + 1, 0).getDate();

        let diffDays: number = curDay >= burgerDay ? curDay - burgerDay : prevMonthDays + curDay - burgerDay;
        const timeLabel: string =
            diffDays === 0 ? "Сегодня " :
                diffDays === 1 ? "Вчера " :
                    diffDays % 10 === 2 || diffDays % 10 === 3 || diffDays % 10 === 4 ? String(diffDays) + " дня назад "
                        : diffDays % 10 === 1 ? String(diffDays) + " день назад"
                            : String(diffDays) + " дней назад ";
        const zoneLabel: string = " i-GMT" + burgerDate.toTimeString().substring(12, 18).replaceAll("0", "");

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

export const BurgerIngredientImage: FC<TimageIngredient> = ({ image, text, type }) => {
    const styleText = {
            zIndex: 100
    } as const;

    return (
        <div className={bStyles.imageContainer} style={type === "row" ? { marginRight: "-16px" } : {}}>
            <div
                className={!!text ? bStyles.cardImageBlur : bStyles.cardImage}
                style={{ backgroundImage: "url(" + image + ")" }}
            >
                {!!text &&
                    <span className="text text_type_digits-default" style={styleText}>
                        {text}
                    </span>
                }
            </div>
        </div>
    )
}

export const BurgerPrice: FC<{total:number}> = ({ total }) =>
    <div className={bStyles.cardTotal}>
        <span className="text text_type_digits-default mr-2">{total}</span>
        <CurrencyIcon type={"primary"}/>
    </div>;

export const BurgerNumber: FC<{ number: number }> = ({ number }) =>
    <p className="text text_type_digits-default">
        #{number}
    </p>;