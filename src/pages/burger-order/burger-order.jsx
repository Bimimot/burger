import React, { useState, useEffect } from "react";
import pStyles from '../pages.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation } from 'react-router-dom';
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
        history.goBack(-1);
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

export const BurgerOrderPage = ({ type }) => {
    //type:  feed || profile
    const { id } = useParams();
    const feedOrders  = useSelector(store => store.feed.orders);
    const profileOrders = useSelector(store => store.feed.orders); //hardcode
    const { isLoading, isError, isLoaded } = useSelector(store => store.foods);

    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!!feedOrders.length && type==="feed") {
            setOrder(feedOrders.find(order => order._id === id))            
        }
        if (!!profileOrders.length && type === "profile") {
            setOrder(profileOrders.find(order => order._id === id))
        }
    }, [isLoaded, feedOrders, profileOrders, id, type]);

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