import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { ConstructorMenu } from './components/constructor-menu';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';


export const BurgerConstructor = () => {    
    const burger = useSelector(store => store.burger);
    const orders = useSelector(store => store.orders);
    const dispatch = useDispatch();

    return (
        <article className={cStyles.constructor}>
            <ConstructorMenu/>
            {!!burger.bun &&
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={burger.bun.name + " (верх)"}
                    price={burger.bun.price}
                    thumbnail={burger.bun.image}
                />
            }
            {!!burger.filling.length &&
                <Filling filling={burger.filling} />
            }
            {!!burger.bun &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={burger.bun.name + " (низ)"}
                    price={burger.bun.price}
                    thumbnail={burger.bun.image}
                />
            }

            {(!!burger.bun && !!burger.filling.length) &&
                <ConfirmOrder />
            }

            <div style={{ overflow: 'hidden' }}>
                {orders.openDetails &&
                    <Modal onClose={() => dispatch({type: 'orders/closeDetails'})} isLoading={orders.isLoading}>
                        <OrderDetails orders={orders} />
                    </Modal>
                }
            </div>
        </article >
    )
}
