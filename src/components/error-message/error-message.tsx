import React, {FC} from 'react';
import eStyles from './error-message.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ItextArr } from '../../utils/proptypes';

export const ErrorMessage:FC<ItextArr> = React.memo(
    ({ textArr }) => {
        const initialTextArr = ["Что-то пошло не так.", "Попробуйте обновить страницу."];
        const errorArr = !!textArr ? textArr : initialTextArr;
        
        return (
            <div className={eStyles.container}>
                <div className={eStyles.icons}>
                    <BurgerIcon type="error" />
                    <BurgerIcon type="error" />
                    <BurgerIcon type="error" />
                </div>
                {errorArr.map((text, i) =>
                    <p className="text text_type_main-medium m-4" key={i + text}>{text}</p>)
                }
            </div>
        )
    }
);