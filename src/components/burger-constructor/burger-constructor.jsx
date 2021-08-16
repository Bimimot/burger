import React from 'react';
import cStyles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


//import { constructorPropTypes } from './burger-ingredients-proptypes';
import ScrollBox from '../scrollbox/scrollbox';


export default class BurgerConstructor extends React.Component {
    constructor(props) {
        // BurgerConstructor.propTypes = ingredientsPropTypes;
        super(props);
        this.state = {
            bun: {},
            filling: []
        }
        this.countTotal = this.countTotal.bind(this);
    }

    componentDidMount() {
        this.resizeCurrencyIcon();
        this.setFilling();
    }

    setFilling() {
        this.setState({
            bun: this.props.recipe.find(food => food.type === "bun"),
            filling: this.props.recipe.filter(food => food.type !== "bun")
        })
    }

    resizeCurrencyIcon() {
        const price = document.querySelector('#orderPrice');
        const svgIcon = price.querySelector('svg');
        const priceSize = getComputedStyle(price).fontSize;
        svgIcon.setAttribute('width', priceSize);
        svgIcon.setAttribute('height', priceSize);
    }

    countTotal() {
        return this.props.recipe.reduce((total, current) => total + current.price, 0)
    }


    render() {
        const { bun, filling } = this.state;
        console.log("filling", filling.length);

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

const Filling = ({ filling }) => (
    <div style={{ flexGrow: filling.length, overflow: "hidden" }}>
        <ScrollBox id={"burgerConstructor"}>
            <div className={cStyles.recipe}>
                {filling.map((item, i) => (
                    item.type !== "bun" && <ConstructorElement
                        key={item._id + i}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                ))}
            </div>
        </ScrollBox>
    </div>
)

const ConfirmOrder = ({total}) => (
    <div className={cStyles.confirm}>
        <div className={cStyles.orderPrice + " text text_type_main-large"} id="orderPrice">
            <span className="m-3" style={{ lineHeight: "1" }}>{total}</span>
            <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">Оформить заказ</Button>
    </div>
)