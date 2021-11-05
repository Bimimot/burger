import React, {FC} from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useDispatch } from '../../../services/types/hooks-types';
import { useLocation, Link } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TingredientCardProps } from '../../../utils/proptypes';
import { useDrag } from "react-dnd";

export const IngredientCard: FC<TingredientCardProps> = React.memo(
    ({ food }) => {
        const dispatch = useDispatch();
        const location = useLocation();

        const [, dragRef] = useDrag({
            type: "food",
            item: food
        });


        return (
            <Link to={{
                pathname: `/ingredients/${food._id}`,
                state: { background: location }
            }}>
                <li className={iStyles.card}
                    onClick={() => dispatch({ type: "ingredient/openIngredient", payload: food })}>
                    <img className={iStyles.cardImage} src={food.image} alt={food.name} ref={dragRef} />
                    <div className={iStyles.cardText}>
                        <div className={iStyles.cardPrice}>
                            <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
                            <CurrencyIcon type={"primary"} />
                        </div>
                        <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
                    </div>
                    <div className={iStyles.count}>
                        {!!food.count && <Counter count={food.count} size="default" />}
                    </div>
                </li>
            </Link>
        )
    }
);