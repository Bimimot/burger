
import React from 'react';
import { useHistory } from 'react-router-dom';
import { detailsProptypes } from '../../utils/proptypes';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { IngredientDescription } from './ingredient-desc';
import { addInRecipe } from '../../services/slicers/burger';

export const IngredientsDetails = React.memo(
    ({ ingredient }) => {
        IngredientsDetails.propTypes = detailsProptypes;
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