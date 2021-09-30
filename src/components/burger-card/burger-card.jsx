import React from 'react';
import bStyles from './burger-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export const BurgerCard = React.memo(
    ({ burger }) => {
        const isLoaded = useSelector(store => store.foods.isLoaded);

        return (
            <div className={bStyles.card}>
                <CardHeader
                    id={burger.number}
                    time={burger.createdAt}
                />
                <p className="text text_type_main-medium">{burger.name}</p>

                {isLoaded &&
                    <CardFooter
                        ingredients={burger.ingredients}
                        total={burger.total}
                    />}
            </div>
        )

    }
)

const CardHeader = ({ id, time }) => {
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
        <div className={bStyles.cardHeader}>
            <p className="text text_type_digits-default">#{id}</p>
            <p className="text text_type_main-default" style={{ color: "var(--text-secondary-color)" }}>{curTime()}</p>
        </div>
    )
}

const CardFooter = ({ ingredients, total }) => {
    return (
        <div className={bStyles.cardFooter}>
            <div>
                <CardFoods ingredients={ingredients} />
            </div>
            <div className={bStyles.cardTotal}>
                <span className="text text_type_digits-default mr-2">{total}</span>
                <CurrencyIcon />
            </div>
        </div>
    )
}

const CardFoods = ({ ingredients }) => {
    const foods = useSelector(store => store.foods.items);

    const foodsImages = [];
    ingredients.forEach(ingredient =>
        foodsImages.push(foods.find(f => f._id === ingredient).image)

    );

    const bigBurger = foodsImages.length > 6;

    return (
        <div className={bStyles.cardImages}>
            {foodsImages.map((image, i) =>
                i<6 && <React.Fragment key={i}>
                    <div className={(i === 5 && bigBurger) ? bStyles.cardImageBlur : bStyles.cardImage}
                        style={{
                            left: 50 * i + 2 + "px",
                            zIndex: 20 - i * 2,
                            backgroundImage: "url(" + image + ")",
                        }}
                    >
                        {(i === 5 && bigBurger)
                            && <span className="text text_type_digits-default">
                            {"+"}{foodsImages.length - 5}
                        </span>
                        }
                    </div>

                    <div className={bStyles.cardImageBorder} style={{ left: 50 * i + "px", zIndex: 20 - i * 2 - 1}}></div>
                </React.Fragment>)
            }
        </div>)
}

{/* <img
                        className={bStyles.cardImage}
                        src={image}
                        alt="inredient"
                        style={{
                            left: 50 * i + 2 + "px",
                            zIndex: 20 - i * 2,
                        }}
                    /> */}