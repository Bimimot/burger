import React from 'react';
import { useState, useEffect } from 'react';
import iStyles from './burger-ingredients.module.css';
import { ingredientsPropTypes } from '../../utils/proptypes';
import { translations } from '../../utils/data';
import { IngredientsMenu } from './components/ingredients-menu';
import { IngredientsSections } from './components/ingredients-sections';
import { ScrollBox } from '../scrollbox/scrollbox';
import { Modal } from '../modal/modal';
import { IngredientsDetails } from '../ingredient-details/ingredients-details';

export const BurgerIngredients = React.memo(
    ({ ingredients }) => {
        BurgerIngredients.propTypes = ingredientsPropTypes;
        const [sections, setSections] = useState([]);
        const [details, setDetails] = useState({
            show: false,
            ingredient: null
        })

        useEffect(() => {
            const newSections = [];
            ingredients.forEach(food => {
                const foodIndex = newSections.findIndex(s => s.id === food.type);
                foodIndex > -1 ? newSections[foodIndex].foods.push(food)
                    : newSections.push({ id: food.type, text: translations[food.type], foods: [food] })
            });
            setSections(newSections);
        }, [ingredients]);

        const showDetails = (ingredient) => {
            setDetails({
                show: true,
                ingredient: ingredient
            })
        }

        return (
            <article className={iStyles.ingredients}>
                {sections.length &&
                    <>
                        <IngredientsMenu sections={sections} title={"Соберите бургер"} />
                        <ScrollBox top={40} bottom={52}>
                            <IngredientsSections
                                sections={sections}
                                showDetails={showDetails} />
                        </ScrollBox>
                    </>
                }
                <div style={{ position: "fixed", overflow: "hidden" }}>
                    {details.show &&
                        <Modal title="Детали ингредиента" onClose={() => setDetails({ show: false, details: null })}>
                            <IngredientsDetails ingredient={details.ingredient} />
                        </Modal>}
                </div>
            </article>
        )
    }
)