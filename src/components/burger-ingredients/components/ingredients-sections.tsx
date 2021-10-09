import React, { FC } from 'react';
import iStyles from '../burger-ingredients.module.css';
import { useEffect, useRef } from 'react';
import { IngredientCard } from './ingredient-card';
import { TingredientsMenuProps } from '../../../utils/proptypes';

export const IngredientsSections: FC<TingredientsMenuProps> = React.memo(
    ({ sections }) => {

        const lastSectionRef = useRef<HTMLLIElement>(null);

        useEffect(() => {
            if (lastSectionRef !== null && lastSectionRef.current !== null) {
                const sectionHeight = lastSectionRef.current.offsetHeight;
                let boxHeight = 0;
                const ingredientsElem = lastSectionRef.current.closest('#ingredients');

                if (ingredientsElem !== null) {
                    boxHeight = ingredientsElem.clientHeight;
                }

                if (boxHeight > sectionHeight) {
                    lastSectionRef.current.style.paddingBottom = boxHeight - sectionHeight + "px";
                }
            }
        }, [sections]);

        return (
            <ul className={iStyles.sections}>
                {sections.map((section, i) => (
                    <li className={iStyles.sectionFood}
                        key={section.id}
                        id={section.id}
                        ref={i === (sections.length - 1) ? lastSectionRef : undefined}
                    >
                        <h2 className="text text_type_main-medium">{section.text}</h2>
                        <ul className={iStyles.cards}>
                            {section.foods.map(f =>
                                <IngredientCard
                                    key={f._id}
                                    food={f}
                                />)}
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }
)





