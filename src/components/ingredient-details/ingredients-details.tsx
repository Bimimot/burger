
import React, {FC} from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { IngredientDescription } from './ingredient-desc';
import { addInRecipe } from '../../services/slicers/burger-constructor/burger-constructor';
import { Tfood } from '../../utils/proptypes';

export const IngredientsDetails: FC<{ingredient: Tfood}> = React.memo(
    ({ ingredient }) => {
        const bun = useSelector(store => store.burger.bun);
        const dispatch = useDispatch();
        const history = useHistory();

        const addIngredient = () => {     
            dispatch(addInRecipe(ingredient));
            dispatch({ type: 'ingredient/closeIngredient' });
            history.push('/');
        }

        return (
            <IngredientDescription ingredient={ingredient}>
                {(ingredient.type !== "bun" || JSON.stringify(ingredient) !== JSON.stringify(bun))
                    && <Button type="primary" size="medium" onClick={addIngredient}>
                    {(ingredient.type === "bun" && !!bun)
                        ? "Заменить булку в бургере"
                        : "Добавить к бургеру"}
                    </Button>
                }
            </IngredientDescription>
        )
    }
)