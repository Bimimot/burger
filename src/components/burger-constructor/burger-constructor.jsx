import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import cStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { ConstructorMenu } from './components/constructor-menu';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { addInRecipe, clearRecipe } from '../../services/slicers/burger-constructor/burger-constructor';


import { useDrop } from "react-dnd";

export const BurgerConstructor = () => {
    const burger = useSelector(store => store.burger);
    const orders = useSelector(store => store.orders);
    const dispatch = useDispatch();

    const onDropHandler = (item) => {
        dispatch(addInRecipe(item));
    };

    const [{ canDrop, isOver }, dropTarget] = useDrop({
        accept: "food",
        drop: (item) => onDropHandler(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    });

    const onCloseOrder = () => {
        dispatch({ type: 'orders/closeDetails' });
        dispatch(clearRecipe());
    }

    return (
        <article className={cStyles.constructor} >
            <ConstructorMenu />
            <div className={cStyles.dropContainer} id="dropContainer"
                ref={dropTarget}
                drop={String(isOver && canDrop)}
                drag={String(!isOver && canDrop )}
            >
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
                    <Filling filling={burger.filling}
                        isDrag={isOver && canDrop}
                        canDrop={canDrop}
                    />
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
            </div>

            {(!!burger.bun && !!burger.filling.length) &&
                <ConfirmOrder />
            }

            <div style={{ overflow: 'hidden' }}>
                {orders.openDetails &&
                    <Modal onClose={onCloseOrder} isLoading={orders.isLoading}>
                        <OrderDetails orders={orders} />
                    </Modal>
                }
            </div>
        </article >
    )
}
