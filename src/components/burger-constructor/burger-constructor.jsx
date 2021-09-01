import React from 'react';
import { useState } from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from '../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
//import { randomInteger } from '../../utils/helpers';
import { loadOrderNumber } from '../../utils/api';

export const BurgerConstructor = React.memo(
    ({ recipe }) => {
        BurgerConstructor.propTypes = constructorPropTypes;

        // const [openOrder, setOpenOrder] = useState(false);
        // const [orderNumber, setOrderNumber] = useState("");
        const initialOrder = {
            open: false,
            number: null,
            isLoading: false,
            isError: false
        };

        const [order, setOrder] = useState(initialOrder);

        const bun = recipe.find(food => food.type === "bun");
        const filling = recipe.filter(food => food.type !== "bun");
        const totalPrice = filling.reduce((total, current) => total + current.price, 0)
            + (bun.price * 2);



        const confirmOrder = () => {
            setOrder({ ...order, open: true, isLoading: true });
            const arrIngredients = recipe.map(food => food._id);

            loadOrderNumber(arrIngredients)
                .then(result => setOrder({
                    ...order,
                    open: true,
                    isLoading: false,
                    number: result.order.number
                }))
                .catch(e => {
                    console.log("Error:", e);
                    setOrder({
                        ...order,
                        open: true,
                        isLoading: false,
                        isError: true
                    });
                })
        }

        console.log("-====orderState======-:", order);

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
                {!!totalPrice
                    && <ConfirmOrder
                    totalPrice={totalPrice}
                    confirm={confirmOrder}
                />}

                <div style={{ overflow: 'hidden' }}>
                    {order.open &&
                        <Modal onClose={() => setOrder({...initialOrder})}>
                        <OrderDetails order={order}/>
                        </Modal>
                    }
                </div>
            </article>
        )
    }
)