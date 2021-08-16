import cStyles from '../burger-constructor.module.css';
import { sectionsPropTypes } from '../burger-constructor-proptypes';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const ConstructorSections = ({ sections }) => {
    ConstructorSections.propTypes = sectionsPropTypes;

    return (<>
        {sections.map(section => (
            <div className={cStyles.sectionFood} key={section.id} id={section.id}>
                <h2 className="text text_type_main-medium">{section.text}</h2>
                <div className={cStyles.cards}>
                    {section.foods.map(f => <FoodCard food={f} key={f._id} />)}
                </div>
            </div>
        )
        )}
    </>)
}

const FoodCard = ({ food }) => (
    <div className={cStyles.card} >
        <img src={food.image} alt={food.name} />
        <div className={cStyles.cardPrice}>
            <p className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <h3 className={cStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
        <div className={cStyles.count}>
            {Math.random() > .7 &&
                <Counter count={1} size="default" />
            }
        </div>
    </div>
);

