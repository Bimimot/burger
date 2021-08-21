import React from 'react';
import { useState } from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from '../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { Modal } from '../modal/modal';
import { OrderIngredients } from '../order-ingredients/order-ingredients';
import { randomInteger } from '../../utils/helpers';

export const BurgerConstructor = React.memo(
    ({ recipe }) => {
        BurgerConstructor.propTypes = constructorPropTypes;
        const [openOrder, setOpenOrder] = useState(false);
        const [orderNumber, setOrderNumber] = useState("");

        const bun = recipe.find(food => food.type === "bun");
        const filling = recipe.filter(food => food.type !== "bun");
        const total = recipe.reduce((total, current) => total + current.price, 0);

        const confirmOrder = () => {
            setOpenOrder(true);
            let order = "";
            for (let i = 0; i < 6; i++) {
                order = order + randomInteger(0, 9);
            };
            setOrderNumber(order);
        }

        return (
            <article className={cStyles.constructor}>
                {!!bun.price &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
                {filling.length &&
                    <Filling filling={filling} />
                }
                {!!bun.price &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
                {!!total && <ConfirmOrder
                    total={total}
                    confirm={confirmOrder}
                />}

                <div style={{ overflow: 'hidden' }}>
                    {openOrder &&
                        <Modal onClose={() => setOpenOrder(false)}>
                            <OrderIngredients order={orderNumber} />
                        </Modal>
                    }
                </div>
            </article>
        )
    }
)