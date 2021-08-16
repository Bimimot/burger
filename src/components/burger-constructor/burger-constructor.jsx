import React from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from './burger-constructor-proptypes';
import { ConstructorMenu } from './burger-constructor-components/constructor-menu';
import { ConstructorSections } from './burger-constructor-components/constructor-sections';

import ScrollBox from '../scrollbox/scrollbox';

export default class BurgerConstructor extends React.Component {
    constructor(props) {
        BurgerConstructor.propTypes = constructorPropTypes;
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
            <article className={cStyles.constructor}>
                {sections.length &&
                    <>
                        <ConstructorMenu sections={sections} title={"Соберите бургер"} />
                        <ScrollBox id={"burger-constructor"}>
                            <ConstructorSections sections={sections} />
                        </ScrollBox>
                    </>
                }
            </article>
        )
    }
}