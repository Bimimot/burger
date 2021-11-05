import React, {FC} from 'react';
import cStyles from '../burger-constructor.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../../services/types/hooks-types';
import { clearRecipe, randomRecipe } from '../../../services/slicers/burger-constructor/burger-constructor';

export const ConstructorMenu: FC = () => {
    const dispatch = useDispatch();

    return (
        <div className={cStyles.menu}>
            <Button type="primary" size="small" onClick={() => dispatch(randomRecipe())}>
                Рецепт от нашего робота
            </Button>
            <Button type="primary" size="small" onClick={() => dispatch(clearRecipe())}>
                Сбросить рецепт
            </Button>
        </div>
    )
}