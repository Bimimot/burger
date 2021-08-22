import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useEffect, useRef } from 'react';
import { sectionsPropTypes } from '../../../utils/proptypes';
import { IngredientCard } from './ingredient-card';

export const IngredientsSections = React.memo(
    ({ sections, showDetails }) => {
        IngredientsSections.propTypes = sectionsPropTypes;

        const lastSectionRef = useRef(null);
        useEffect(() => {
            const sectionHeight = lastSectionRef.current.offsetHeight;
            const boxHeight = lastSectionRef.current.closest('#scrollbox').clientHeight;
            if (boxHeight > sectionHeight) {
                lastSectionRef.current.style.paddingBottom = boxHeight - sectionHeight + "px";
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
                            {section.foods.map(f =>
                                <IngredientCard
                                    key={f._id}
                                    food={f}
                                    showDetails={() => showDetails(f)}
                                />)}
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }
)





