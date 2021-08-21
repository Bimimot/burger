import React from 'react';
import cStyles from '../burger-constructor.module.css';
import { fillingProptypes } from '../../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ScrollBox } from '../../scrollbox/scrollbox';

export const Filling = React.memo(
    ({ filling }) => (
    <div style={{ flexGrow: filling.length, overflow: "hidden" }}>
        <ScrollBox>
            <div className={cStyles.recipe}>
                {filling.map((item, i) =>
                    <ConstructorElement
                        key={item._id + i}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                )}
            </div>
        </ScrollBox>
    </div>
    )
)
Filling.propTypes = fillingProptypes;