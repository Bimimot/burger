
import React, { useContext } from 'react';
import dStyles from './ingredients-details.module.css';
import { detailsProptypes } from '../../utils/proptypes';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../utils/context';

export const IngredientsDetails = React.memo(
    ({ closeDetails, ingredient }) => {
        IngredientsDetails.propTypes = detailsProptypes;
        const [burger, dispatchBurger] = useContext(BurgerContext);

        const addIngredient = () => {
            closeDetails();
            dispatchBurger({ type: "add", food: ingredient })
        }

        return (
            <div className={dStyles.container}>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <h3 className="text text_type_main-medium mb-4 mt-4">{ingredient.name}</h3>
                <div className={dStyles.composition + " mt-4 mb-8"}>
                    <div className={dStyles.composeItem}>
                        <span className="text text_type_main-default text_color_inactive mb-2">Калории, кКал</span>
                        <span className="text text_type_digits-default text_color_inactive mb-2">{ingredient.calories}</span>
                    </div>
                    <div className={dStyles.composeItem}>
                        <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
                        <span className="text text_type_digits-default text_color_inactive mb-2">{ingredient.proteins}</span>
                    </div>
                    <div className={dStyles.composeItem}>
                        <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive mb-2">{ingredient.fat}</span>
                    </div>
                    <div className={dStyles.composeItem}>
                        <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</span>
                        <span className="text text_type_digits-default text_color_inactive mb-2">{ingredient.carbohydrates}</span>
                    </div>
                </div>

                {(ingredient.type !== "bun" || JSON.stringify(ingredient) !== JSON.stringify(burger.bun))
                    && <Button type="primary" size="medium" onClick={addIngredient}>
                    {(ingredient.type === "bun" && !!burger.bun)
                        ? "Заменить булку в бургере"
                        : "Добавить к бургеру"}
                    </Button>
                }
            </div>
        )
    }
)