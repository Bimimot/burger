import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cStyles from '../burger-constructor.module.css';
import { MovedElement } from '../../moved-element/moved-element';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ScrollBox } from '../../scrollbox/scrollbox';
import update from 'immutability-helper';
import { delFromRecipe } from '../../../services/slicers/burger';


export const Filling = React.memo(() => {
        const filling = useSelector(store => store.burger.filling);
    const dispatch = useDispatch();
    
        const moveElement = useCallback((dragIndex, hoverIndex) => {
            const dragCard = filling[dragIndex];
            dispatch({
                type: 'burger/sort',
                filling: update(filling, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                })
            })
        }, [filling, dispatch]);

        return (
            <div className={cStyles.filling} id="filling">
                <ScrollBox>
                    <div className={cStyles.recipe}>
                        {filling.map((item, i) =>
                            <MovedElement key={item.unicId} index={i} id={item.unicId} moveElement={moveElement}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    handleClose={() => dispatch(delFromRecipe(item))}
                            />
                        </MovedElement>
                        )}
                    </div>
                </ScrollBox>
            </div>
        )
    }
);