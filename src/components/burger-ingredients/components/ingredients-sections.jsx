import iStyles from '../burger-ingredients.module.css';
import { useEffect, useRef } from 'react';
import { sectionsPropTypes } from '../../../utils/proptypes';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsSections = ({ sections }) => {
    IngredientsSections.propTypes = sectionsPropTypes;
    const lastSectionRef = useRef(null);
    useEffect(() => {
        
        const topSection = parseInt(getComputedStyle(lastSectionRef.current).paddingTop);
        const sectionHeight = lastSectionRef.current.offsetHeight;

        const boxHeight = lastSectionRef.current.closest('#scrollbox').clientHeight;

        if (boxHeight > sectionHeight) {
            lastSectionRef.current.style.paddingBottom = boxHeight - sectionHeight - topSection+ "px";
        }
    }, [sections]);

    return (
        <ul className={iStyles.sections}>
            {sections.map((section, i) => (
                <li className={iStyles.sectionFood}
                    key={section.id}
                    id={section.id}
                    ref={i === (sections.length - 1) ? lastSectionRef : null}
                >
                    <h2 className="text text_type_main-medium">{section.text}</h2>
                    <ul className={iStyles.cards}>
                        {section.foods.map(f => <FoodCard food={f} key={f._id} />)}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

const FoodCard = ({ food }) => (
    <li className={iStyles.card} >
        <img src={food.image} alt={food.name} />
        <div className={iStyles.cardPrice}>
            <span className="text text_type_main-medium m-2" style={{ lineHeight: "1" }}>{food.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <h3 className={iStyles.cardTitle + " text text_type_main-default"}>{food.name}</h3>
        <div className={iStyles.count}>
            {Math.random() > .7 &&
                <Counter count={1} size="default" />
            }
        </div>
    </li>
);


