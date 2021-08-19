import { useState, useEffect } from 'react';
import iStyles from './burger-ingredients.module.css';
import { ingredientsPropTypes } from '../../utils/proptypes';
import { translations } from '../../utils/data';
import { IngredientsMenu } from './components/ingredients-menu';
import { IngredientsSections } from './components/ingredients-sections';
import { ScrollBox } from '../scrollbox/scrollbox';

export const BurgerIngredients = ({ ingredients }) => {
    BurgerIngredients.propTypes = ingredientsPropTypes;
    const [sections, setSections] = useState([]);

    useEffect(() => {
        console.log("ingredients", ingredients);

        const newSections = [];
        ingredients.forEach(food => {
            const foodIndex = newSections.findIndex(s => s.id === food.type);
            foodIndex > -1 ? newSections[foodIndex].foods.push(food)
                : newSections.push({ id: food.type, text: translations[food.type], foods: [food] })
        });
        setSections(newSections);
    }, [ingredients]);


    console.log("Ingredients sections", sections);



    // const sections = [];
    // ingredients.forEach(food => {
    //     const foodIndex = sections.findIndex(s => s.id === food.type);
    //     foodIndex > -1 ? sections[foodIndex].foods.push(food)
    //         : sections.push({ id: food.type, text: translations[food.type], foods: [food] })
    // });

    return (
        <article className={iStyles.ingredients}>
            {sections.length &&
                <>
                    <IngredientsMenu sections={sections} title={"Соберите бургер"} />
                    <ScrollBox top={40} bottom={52}>
                        <IngredientsSections sections={sections} />
                    </ScrollBox>
                </>
            }
        </article>
    )
}