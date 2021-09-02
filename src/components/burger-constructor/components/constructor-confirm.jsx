import React from 'react';
import { useEffect, useContext } from 'react';
import cStyles from '../burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { confirmOrderPropTypes } from '../../../utils/proptypes';
import { AllOrdersContext, BurgerContext } from '../../../utils/context';
import { loadOrderNumber } from '../../../utils/api';

export const ConfirmOrder = ({orderState}) => {
    ConfirmOrder.propTypes = confirmOrderPropTypes;
    const [order, setOrder] = orderState;
    const [recipe] = useContext(BurgerContext);
    const [allOrders, setAllOrders] = useContext(AllOrdersContext);

    useEffect(() => {
        resizeCurrencyIcon()
    }, []);

    const resizeCurrencyIcon = () => {
        const price = document.querySelector('#orderPrice');
        const svgIcon = price.querySelector('svg');
        const priceSize = getComputedStyle(price).fontSize;
        svgIcon.setAttribute('width', priceSize);
        svgIcon.setAttribute('height', priceSize);
    }

    const confirmOrder = () => {
        setOrder({ ...order, open: true, isLoading: true });

        loadOrderNumber(recipe.recipe.map(ing => ing._id))
            .then(result => 
             {
                setOrder({
                    ...order,
                    open: true,
                    isLoading: false,
                    number: result.order.number
                });
                setAllOrders(
                    [...allOrders,
                    {
                        number: result.order.number,
                        ingredients: recipe,
                        totalPrice: recipe.totalPrice
                    }])
            })
            .catch(e => {
                console.log("Error with loadOrderNumber: ", e);
                setOrder(
                    {
                        ...order,
                        open: true,
                        isLoading: false,
                        isError: true
                    }
                )
            })
    }

    console.log(allOrders);

    return (
        <div className={cStyles.confirm}>
            <div className={cStyles.orderPrice + " text text_type_main-large"} id="orderPrice">
                <span className="m-3" style={{ lineHeight: "1" }}>{recipe.totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={confirmOrder}>Оформить заказ</Button>
        </div>
    )
}

