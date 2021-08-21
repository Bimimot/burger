import { useState } from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from '../../utils/proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';
import { Modal } from '../modal/modal';
import { OrderIngredients } from '../order-ingredients/OrderIngredients';

export const BurgerConstructor = ({ recipe }) => {
    BurgerConstructor.propTypes = constructorPropTypes;
    const [openOrder, setOpenOrder] = useState(false);

    const bun = recipe.find(food => food.type === "bun");
    const filling = recipe.filter(food => food.type !== "bun");
    const total = recipe.reduce((total, current) => total + current.price, 0);

    return (
        <article className={cStyles.constructor}>
            {!!bun.price &&
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name + " (верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }
            {filling.length &&
                <Filling filling={filling} />
            }
            {!!bun.price &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name + " (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }
            {!!total && <ConfirmOrder
                total={total}
                confirm={() => setOpenOrder(true)}
            />}

            <div style={{ overflow: 'hidden' }}>
                {openOrder &&
                    <Modal onClose={() => setOpenOrder(false)}>
                        <OrderIngredients order={"123456"} />
                    </Modal>
                }
            </div>
        </article>
    )
}