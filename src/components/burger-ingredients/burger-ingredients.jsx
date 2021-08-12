import React from 'react';
import makerStyles from './burger-ingredients.module.css';

export default class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <section className={makerStyles.ingredients}>

            </section>
        )
    }

}