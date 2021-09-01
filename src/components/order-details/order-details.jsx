import React from 'react';
import oStyles from "./order-details.module.css";
import { orderProptypes } from '../../utils/proptypes';
import iconDonePath from "../../images/icon-done.png"
import { Loader } from '../loader/loader';
import { ErrorMessage } from '../error-message/error-message';

export const OrderDetails = React.memo(
    ({ order }) => {
        OrderDetails.orderProptypes = orderProptypes;

        return (
            <div className={oStyles.container}>
                {order.isLoading && <Loader text={"Отправляем на кухню"} />}
                {order.isError && <ErrorMessage />}

                {order.number
                    && <>
                        <h1 className={oStyles.title + " text text_type_digits-large"}>{order.number}</h1>
                        <p className="text text_type_main-medium">идентификатор заказа</p>
                        <img className={oStyles.icon} src={iconDonePath} alt="icon done" />
                        <p className="text text_type_main-default mb-2">ваш заказ начали готовить</p>
                        <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
                    </>
                }
            </div>
        )
    }
)
