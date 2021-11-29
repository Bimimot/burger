import React, { useState, useEffect, FC } from "react";
import pStyles from '../pages.module.css';
import { ErrorMessage } from '../../components/error-message/error-message';
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

    const { id } = useParams<{ id: string }>();
    const { orders, success, isError } = useSelector(store => store.wsFeed);
    // const feedOrders = useSelector(store => store.wsFeed.orders);
    const profileOrders = useSelector(store => store.wsOrders.orders);
    const isLoadedFoods = useSelector(store => store.foods.isLoaded)
    const dispatch = useDispatch();

    const [state, setState] = useState({
        order: null,
        isLoading: true
    });

    useEffect(() => {
        if (isLoadedFoods && !success) {
            dispatch({ type: "wsFeed/wsInit" })
        }
    }, [isLoadedFoods, success, dispatch]);

    useEffect(() => {
        return () => {
            dispatch({ type: "wsFeed/wsClosed" })
        }
    }, []);

    useEffect(() => {
        if (!!orders && type === "feed") {
            setState({
                order: orders.find(order => order._id === id),
                isLoading: false
            })
        }
        if (!!profileOrders && type === "profile") {
            setState({
                order: profileOrders.find(order => order._id === id),
                isLoading: false
            })
        }
    }, [orders, profileOrders, id, type]);

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
            {isError && <ErrorMessage />}
        </div>
    )
}