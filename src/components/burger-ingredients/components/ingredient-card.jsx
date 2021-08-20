import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../modal/modal';

export const IngredientCard = React.memo(
    ({ food }) => {
        const [showDetails, setShowDetails] = useState(false);
        const [currencyType, setCurrencyType] = useState("primary");
        const [count, setCount] = useState(null);

        useEffect(() => {
            setCount(Math.random() > .7)
        }, []);

        return (
            <>
                <li className={iStyles.card}
                    onMouseEnter={() => setCurrencyType("success")}
                    onMouseLeave={() => setCurrencyType("primary")}
                    onClick={() => setShowDetails(true)}
                >
                    <img src={food.image} alt={food.name} />
                    <div className={iStyles.cardPrice}>
                        <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                        <CurrencyIcon type={currencyType} />
                    </div>
                    <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                    <div className={iStyles.count}>
                        {count &&  <Counter count={1} size="default" />}
                    </div>
                </li>
                <div style={{ position: "fixed", overflow: "hidden" }}>
                    {showDetails &&
                        <Modal title={food.name} onClose={() => setShowDetails(false)}>
                            <div>
                                <img src={food.image} alt={food.name} />
                                <div className={iStyles.cardPrice}>
                                    <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                            </div>
                        </Modal>}
                </div>
            </>
        )
    }
);