import React, {useContext} from 'react';
import cStyles from '../burger-constructor.module.css';
import { BurgerContext } from '../../../utils/context';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ConstructorMenu = () => {
    const [burger, dispatchBurger] = useContext(BurgerContext);

    return (
        <div className={cStyles.menu}>
            <Button type="primary" size="small" onClick={() => dispatchBurger({type: "random"})}>
                Рецепт от нашего робота
            </Button>
            <Button type="primary" size="small" onClick={() => dispatchBurger({ type: "clear" })}>
                Сбросить рецепт
            </Button>
        </div>
    )
}