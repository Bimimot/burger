import React from 'react';
import cStyles from './burger-constructor.module.css';
import { constructorPropTypes } from './burger-constructor-proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Filling } from './components/constructor-filling';
import { ConfirmOrder } from './components/constructor-confirm';

export default class BurgerConstructor extends React.Component {
    constructor(props) {
        BurgerConstructor.propTypes = constructorPropTypes;
        super(props);
        this.state = { bun: {}, filling: []}
        this.countTotal = this.countTotal.bind(this);
    }

    componentDidMount() {
        this.setFilling();
    }

    setFilling() {
        this.setState({
            bun: this.props.recipe.find(food => food.type === "bun"),
            filling: this.props.recipe.filter(food => food.type !== "bun")
        })
    }

    countTotal() {
        return this.props.recipe.reduce((total, current) => total + current.price, 0)
    }

    render() {
        const { bun, filling } = this.state;
        return (
            <article className={cStyles.constructor}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name + " (верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <Filling filling={filling} />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name + " (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <ConfirmOrder total={this.countTotal()}/>
            </article>
        )
    }
}