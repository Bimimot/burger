import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cStyles from '../burger-constructor.module.css';
// import { fillingProptypes } from '../../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ScrollBox } from '../../scrollbox/scrollbox';


export const Filling = React.memo(
    () => {
        // Filling.propTypes = fillingProptypes;
        const filling = useSelector(store => store.burger.filling);
        const dispatch = useDispatch();

        return (
            <div style={{ overflow: "hidden" }}>
                <ScrollBox>
                    <div className={cStyles.recipe}>
                        {filling.map((item, i) =>
                            <ConstructorElement
                                key={item._id + i}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => dispatch({type: "burger/del", fillingIndex: i})}
                            />
                        )}
                    </div>
                </ScrollBox>
            </div>
        )
    }
)
