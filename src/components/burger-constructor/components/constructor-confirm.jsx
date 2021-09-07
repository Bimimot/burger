import React from 'react';
import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cStyles from '../burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { confirmOrderPropTypes } from '../../../utils/proptypes';
import { AllOrdersContext } from '../../../utils/context';
//import { loadOrderNumber } from '../../../utils/api';
import { getOrderNumber } from '../../../services/slicers/orders';

const resizeCurrencyIcon = () => {
    const price = document.querySelector('#orderPrice');
    const svgIcon = price.querySelector('svg');
    const priceSize = getComputedStyle(price).fontSize;
    svgIcon.setAttribute('width', priceSize);
    svgIcon.setAttribute('height', priceSize);
}

export const ConfirmOrder = ({ orderState }) => {
    // ConfirmOrder.propTypes = confirmOrderPropTypes;
    
    // const [order, setOrder] = orderState;
    const dispatch = useDispatch();
    const burger = useSelector(store => store.burger);

    // const [allOrders, setAllOrders] = useContext(AllOrdersContext);

    useEffect(() => {
        resizeCurrencyIcon()
    }, []);

    const orders = useSelector(store => store.orders);
    console.log(">> AllOrders from Store >> ", orders);
    
    const confirmOrder = () => {
        dispatch(getOrderNumber(burger.recipe.map(ing => ing._id)));        
    }


    // const confirmOrder = () => {
    //     setOrder({ ...order, open: true, isLoading: true });

    //     loadOrderNumber(burger.recipe.map(ing => ing._id))
    //         .then(result => {
    //             setOrder({
    //                 ...order,
    //                 open: true,
    //                 isLoading: false,
    //                 number: result.order.number
    //             });
    //             setAllOrders(
    //                 [...allOrders,
    //                 {
    //                     number: result.order.number,
    //                     ingredients: burger.ingredients,
    //                     totalPrice: burger.totalPrice
    //                 }
    //                 ]);
    //             dispatch({ type: "burger/clear" });
    //         })
    //         .catch(e => {
    //             console.log("Error with loadOrderNumber: ", e);
    //             setOrder(
    //                 {
    //                     ...order,
    //                     open: true,
    //                     isLoading: false,
    //                     isError: true
    //                 }
    //             )
    //         })

    // }

    return (
        <div className={cStyles.confirm}>
            <div className={cStyles.orderPrice + " text text_type_main-large"} id="orderPrice">
                <span className="m-3" style={{ lineHeight: "1" }}>{burger.totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={confirmOrder}>Оформить заказ</Button>
        </div>
    )
}

