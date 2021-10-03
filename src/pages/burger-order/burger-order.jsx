import React, { useState, useEffect } from "react";
import pStyles from '../pages.module.css';
import { burgerOrderPagePropTypes } from '../../utils/proptypes';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { BurgerOrder } from "../../components/burger-order/burger-order";
import { Modal } from '../../components/modal/modal';
import { Loader } from '../../components/loader/loader';
import { NoOrderPage } from "..";


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
    BurgerOrderPage.propTypes = burgerOrderPagePropTypes;

    const { id } = useParams();
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