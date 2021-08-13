import React from 'react';
import PropTypes from 'prop-types';
import cStyles from './burger-constructor.module.css';
import { ConstructorMenu } from './burger-constructor-components/constructor-menu';

const foodPropTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
    "calories": PropTypes.number.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "image_mobile": PropTypes.string.isRequired,
    "image_large": PropTypes.string.isRequired,
    "__v": PropTypes.number
});

export default class BurgerConstructor extends React.Component {
    constructor(props) {

        BurgerConstructor.propTypes = {
            foods: PropTypes.arrayOf(foodPropTypes.isRequired).isRequired
        };
        
        super(props);
        this.state = {
            sections: [
                { text: "Булки", id: "bun", foods: [] },
                { text: "Соусы", id: "sauce", foods: []},
                { text: "Начинки", id: "main", foods: []}
            ]
        }
    }

    componentDidMount() {
        this.setState({
            sections: this.state.sections.map(s =>
                ({ ...s, foods: this.props.foods.filter(food => food.type === s.id) }))
        });
    }

    render() {
        const { sections } = this.state;

        return (
            <article className={cStyles.constructor}>
                <ConstructorMenu sections={sections} title={"Соберите бургер"}/>

                {sections.map(section => (
                    <section className={cStyles.sectionFood} key={section.id}>
                        <span className={cStyles.anchor} id={section.id}></span>
                        <h2>{section.text}</h2>
                        {section.foods.map(f => (
                            <div key={f._id} style={{ flexDirection: "column", display: "flex", border: "1px solid", alignItems: "center"}}>
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