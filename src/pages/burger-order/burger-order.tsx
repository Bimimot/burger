import React, { useState, useEffect, FC } from "react";
import pStyles from '../pages.module.css';

import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { useParams, useHistory } from 'react-router-dom';
import { BurgerOrder } from "../../components/burger-order/burger-order";
import { Modal } from '../../components/modal/modal';
import { Loader } from '../../components/loader/loader';
import { NoOrderPage } from "..";


export const BurgerOrderModal: FC = () => {
    const order = useSelector(store => store.burgerOrder);
    const dispatch = useDispatch();
    const history = useHistory();

    const closeModal = () => {
        dispatch({ type: "burgerOrder/closeOrder" });
        history.goBack();
    }

    return (
        <div style={{ position: "fixed", overflow: "hidden" }}>
            {order.show &&
                <Modal
                    onClose={closeModal}
                    children={<BurgerOrder order={order.item!} />}
                />}
        </div>
    )
}

export const BurgerOrderPage: FC<{type: "feed" | "profile"}> = ({ type }) => {

    const { id  } = useParams<{id: string}>();
    const feedOrders = useSelector(store => store.wsFeed.orders);
    const profileOrders = useSelector(store => store.wsOrders.orders);

    const [state, setState] = useState({
        order: null,
        isLoading: true
    });

    useEffect(() => {
        if (!!feedOrders && type === "feed") {
            setState({
                order: feedOrders.find(order => order._id === id),
                isLoading: false
            })
        }
        if (!!profileOrders && type === "profile") {
            setState({
                order: profileOrders.find(order => order._id === id),
                isLoading: false
            })
        }
    }, [feedOrders, profileOrders, id, type]);

    const { order, isLoading } = state;
    return (
        <div className={pStyles.modalPage}>
            {!isLoading &&
                <>
                    {!order
                        ? <NoOrderPage />
                        : <BurgerOrder order={order} />
                    }
                </>
            }
            {isLoading && <Loader text={"Проверяем заказ"} />}
        </div>
    )
}