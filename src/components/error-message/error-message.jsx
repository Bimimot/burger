import React from 'react';
import eStyles from './error-message.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const ErrorMessage = React.memo(
    () => (
        <div className={eStyles.container}>
            <div className={eStyles.icons}>
                <BurgerIcon type="error" />
                <BurgerIcon type="error" />
                <BurgerIcon type="error" />
            </div>
            <p className="text text_type_main-medium">
                Что-то пошло не так.
            </p>
            <p className="text text_type_main-medium">
                Попробуйте обновить страницу.
            </p>
        </div>
    )
)