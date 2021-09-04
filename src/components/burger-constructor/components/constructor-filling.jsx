import React, {useContext} from 'react';
import cStyles from '../burger-constructor.module.css';
import { fillingProptypes } from '../../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ScrollBox } from '../../scrollbox/scrollbox';
import { BurgerContext } from '../../../utils/context';

export const Filling = React.memo(
    () => {
        Filling.propTypes = fillingProptypes;
        const [burger, dispatchBurger] = useContext(BurgerContext);

        return (
            <div style={{ overflow: "hidden" }}>
                <ScrollBox>
                    <div className={cStyles.recipe}>
                        {burger.filling.map((item, i) =>
                            <ConstructorElement
                                key={item._id + i}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => dispatchBurger({type: "delete", fillingIndex: i})}
                            />
                        )}
                    </div>
                </ScrollBox>
            </div>
        )
    }
)
