import React from 'react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../../services/types/hooks-types';
import { useHistory } from 'react-router-dom';
import cStyles from '../burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../../services/slicers/orders/orders';

const resizeCurrencyIcon = () => {
    const price: Element | null = document.querySelector('#orderPrice');
    const svgIcon: Element | null = price !== null ? price.querySelector('svg') : null;
    const priceSize: string = price !== null ? getComputedStyle(price).fontSize : "16px";
    if (svgIcon !== null) {
        svgIcon.setAttribute('width', priceSize);
        svgIcon.setAttribute('height', priceSize);
    }
}

export const ConfirmOrder = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const burger = useSelector(store => store.burger);
    const isAuth = useSelector(store => store.profile.user.isAuth);

    useEffect(() => {
        resizeCurrencyIcon()
    }, []);

    const confirmOrder = useCallback(() => {
        isAuth
            ? dispatch(getOrderNumber(burger.recipe.map(ing => ing._id)))
            : history.push("/login")
    }, [dispatch, burger.recipe])

    return (
        <div className={cStyles.confirm}>
            <div className={cStyles.orderPrice + " text text_type_main-large"} id="orderPrice">
                <span className="m-3" style={{ lineHeight: "1" }}>{burger.totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                type="primary"
                size="large"
                onClick={confirmOrder}
            >
                Оформить заказ
            </Button>
        </div>
    )
}

