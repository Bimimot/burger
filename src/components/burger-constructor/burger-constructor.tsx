import React, {FC} from 'react';

import { useDispatch, useSelector } from '../../services/types/hooks-types';
import cStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { ConstructorMenu } from './components/constructor-menu';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { addInRecipe, clearRecipe } from '../../services/slicers/burger-constructor/burger-constructor';
import { Tfood } from '../../utils/proptypes';


import { useDrop } from "react-dnd";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        drop?: string;
        drag?: string;
    }
}

export const BurgerConstructor: FC = () => {
    const burger = useSelector(store => store.burger);
    const orders = useSelector(store => store.orders);
    const dispatch = useDispatch();

    const onDropHandler = (item: Tfood) => {
        dispatch(addInRecipe(item));
    };

    const [{ canDrop, isOver }, dropTarget] = useDrop({
        accept: "food",
        drop: (item: Tfood) => onDropHandler(item),
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
        <article className={cStyles.main} >
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
                    <Filling
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
