import React from 'react';
import { useSelector } from 'react-redux';
import pStyles from '../pages.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const BurgerConstructorPage = () => {
    const { isLoading, isError, isLoaded } = useSelector(store => store.foods);

    return (
        <>
            {isLoaded &&
                <DndProvider backend={HTML5Backend}>
                    <div className={pStyles.content}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </DndProvider>
            }
            {isLoading && <Loader text={"Обновляем меню"} />}
            {isError && <ErrorMessage />}            
        </>
    )
}