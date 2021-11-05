import React, { FC } from 'react';
import oStyles from "./order-details.module.css";
import iconDonePath from "../../images/icon-done.png"
import { LoaderNumber } from './order-loader-number';
import { Loader } from '../loader/loader';
import { ErrorMessage } from '../error-message/error-message';
import { Torders } from '../../utils/proptypes';

export const OrderDetails: FC<{ orders: Torders }> = React.memo(
    ({ orders }) => {

        return (
            <div className={oStyles.container}>

                {!orders.isError
                    ? <>
                        {orders.isLoading
                            ? <LoaderNumber />
                            : <h1 className={oStyles.title + " text text_type_digits-large"}>{orders.currentNumber}</h1>
                        }
                        <p className="text text_type_main-medium">идентификатор заказа</p>

                        {orders.isLoading
                            ? < Loader text={""} />
                            : <img className={oStyles.icon} src={iconDonePath} alt="icon_done" />
                        }

                        <p className="text text_type_main-default mb-2">
                            {orders.isLoading ? "отправляем на кухню" : "ваш заказ начали готовить"}
                        </p>
                        <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
                    </>
                    : <ErrorMessage textArr={["Извините, заказ не удалось принять", "Попробуйте отправить его еще раз"]} />
                }

            </div>
        )
    }
)
