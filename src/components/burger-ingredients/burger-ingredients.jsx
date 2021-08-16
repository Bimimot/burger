import React from 'react';
import iStyles from './burger-ingredients.module.css';
import { ingredientsPropTypes } from './burger-ingredients-proptypes';
import { IngredientsMenu } from './burger-ingredients-components/ingredients-menu';
import { IngredientsSections } from './burger-ingredients-components/ingredients-sections';

import ScrollBox from '../scrollbox/scrollbox';

export default class BurgerIngredients extends React.Component {
    constructor(props) {
        BurgerIngredients.propTypes = ingredientsPropTypes;
        super(props);
        this.state = { sections: [] } //{id:"", text:"", food: []}}
    }

    componentDidMount() {
        const translations = { bun: "Булки", main: "Начинка", sauce: "Соусы" };
        const sections = [];

        this.props.foods.forEach(food => {
            const foodIndex = sections.findIndex(s => s.id === food.type);
            foodIndex > -1 ? sections[foodIndex].foods.push(food)
                : sections.push({ id: food.type, text: translations[food.type], foods: [food] })
        });

        this.setState({ sections: [...sections] });
    }

    render() {
        const { sections } = this.state;

        return (
            <article className={iStyles.ingredients}>
                {sections.length &&
                    <>
                        <IngredientsMenu sections={sections} title={"Соберите бургер"} />
                        <ScrollBox id={"burger-ingredients"} top={40} bottom={52}>
                            <IngredientsSections sections={sections} />
                        </ScrollBox>
                    </>
                }
            </article>
        )
    }
}