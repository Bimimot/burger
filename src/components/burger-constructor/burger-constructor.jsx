import React from 'react';
import { useContext, useState } from 'react';
import cStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { ConstructorMenu } from './components/constructor-menu';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerContext } from '../../utils/context';

export const BurgerConstructor = ({foods}) => {
    const initialOrder = {
        open: false,
        number: null,
        isLoading: false,
        isError: false,
    };
    const orderState = useState(initialOrder);
    const [order, setOrder] = orderState;

    const [burger] = useContext(BurgerContext);

    return (
        <article className={cStyles.constructor}>
            <ConstructorMenu foods={foods}/>
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
                <ConfirmOrder orderState={orderState} />
            }

            <div style={{ overflow: 'hidden' }}>
                {order.open &&
                    <Modal onClose={() => setOrder(initialOrder)} isLoading={order.isLoading}>
                        <OrderDetails order={order} />
                    </Modal>
                }
            </div>
        </article >
    )
}
