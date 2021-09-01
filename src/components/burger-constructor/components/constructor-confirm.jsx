import React from 'react';
import { useEffect } from 'react';
import cStyles from '../burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { confirmOrderPropTypes } from '../../../utils/proptypes';

export const ConfirmOrder = React.memo(
    ({ confirm, totalPrice }) => {
    ConfirmOrder.propTypes = confirmOrderPropTypes;

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

    return (<div className={cStyles.confirm}>
        <div className={cStyles.orderPrice + " text text_type_main-large"} id="orderPrice">
            <span className="m-3" style={{ lineHeight: "1" }}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={confirm}>Оформить заказ</Button>
    </div>)
    }
)
