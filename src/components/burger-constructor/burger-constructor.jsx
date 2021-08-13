import React from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from './burger-constructor-proptypes';
import { ConstructorMenu } from './burger-constructor-components/constructor-menu';

export default class BurgerConstructor extends React.Component {
    constructor(props) {
        BurgerConstructor.propTypes = constructorPropTypes;

        super(props);
        this.state = {
            sections: []  //{id:"", text:"", food: []}
        }
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
        console.log(this.state);

        return (
            <article className={cStyles.constructor}>
                <ConstructorMenu sections={sections} title={"Соберите бургер"} />

                {sections.map(section => (
                    <section className={cStyles.sectionFood} key={section.id}>
                        <span className={cStyles.anchor} id={section.id}></span>
                        <h2>{section.text}</h2>
                        {section.foods.map(f => (
                            <div key={f._id} style={{ flexDirection: "column", display: "flex", border: "1px solid", alignItems: "center" }}>
                                <h4>{f.name}</h4>
                                <h5>{f.price}</h5>
                                <img src={f.image} alt={f.name} />
                            </div>
                        ))}
                    </section>
                )
                )}
            </article>
        )
    }
}