import React, { useState, useEffect } from "react";
import pStyles from '../pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { BurgerOrder } from "../../components/burger-order/burger-order";
import { Modal } from '../../components/modal/modal';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { NoPage } from "..";

export const BurgerOrderModal = () => {
    const order = useSelector(store => store.burgerOrder);
    const dispatch = useDispatch();
    const history = useHistory();

    const closeModal = () => {
        dispatch({ type: "burgerOrder/closeOrder" });
        history.push('/feed');
    }

    return (
        <div style={{ position: "fixed", overflow: "hidden" }}>
            {order.show &&
                <Modal
                    onClose={closeModal}
                    children={<BurgerOrder order={order.item} />}
                />}
        </div>
    )
}

export const BurgerOrderPage = () => {
    const { id } = useParams();
    const { orders } = useSelector(store => store.feed);
    const { isLoading, isError, isLoaded } = useSelector(store => store.foods);

    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!!orders.length) {
            setOrder(orders.find(order => order._id === id))            
        }
    }, [isLoaded, orders, id]);

    return (
        <div className={pStyles.modalPage}>
            {isLoaded &&
                <>
                    {!!order
                    ?     <BurgerOrder order={order} />
                        : <NoPage />}
                </>
            }
            {isLoading && <Loader text={"Проверяем заказ"} />}
            {isError && <ErrorMessage />}
        </div>
    )
}