import React, { FC } from 'react';
import { Ttext } from '../../utils/proptypes';
import lStyles from './loader.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Loader:FC<Ttext> = React.memo(
    ({ text = "Загружаем..." }) => {
        const icons = [1, 2, 3, 4, 5];

        return (
            <div className={lStyles.container}>
                <div className={lStyles.icons}>
                    {icons.map(icon =>
                        <div
                            key={icon + "loader"}
                            className={lStyles.icon}
                            style={{
                                top: (70 * Math.sin(icon * 2 * Math.PI / icons.length)) + "px",
                                left: (70 * Math.cos(icon * 2 * Math.PI / icons.length)) + "px"
                            }}
                        >
                            <BurgerIcon type="primary" />
                        </div>
                    )}
                </div>
                <p className="text text_type_main-medium">
                    {text}
                </p>
            </div>
        )
    }
)