import React, {useContext} from 'react';
import cStyles from '../burger-constructor.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

export const ConstructorMenu = () => {
    
    const foods = useSelector(store => store.foods);
    const burger = useSelector(store => store.burger);
    const dispatch = useDispatch();
    console.log(burger);


    return (
        <div className={cStyles.menu}>
            <Button type="primary" size="small" onClick={() => dispatch({type: 'burger/random', items:foods.items})}>
                Рецепт от нашего робота
            </Button>
            <Button type="primary" size="small" onClick={() => dispatch({ type: "burger/clear" })}>
                Сбросить рецепт
            </Button>
        </div>
    )
}