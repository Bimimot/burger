import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import iStyles from '../burger-ingredients.module.css';
// import { menuPropTypes } from '../../../utils/proptypes';
import { setActiveSection } from '../../../services/slicers/foods';

export const IngredientsMenu = React.memo(
    () => {
        //IngredientsMenu.propTypes = menuPropTypes;
        const sections = useSelector(store => store.foods.sections);
        const dispatch = useDispatch();

        return (
            <div className={iStyles.menu}>
                <h1 className={"text text_type_main-large mb-5"}>Соберите бургер</h1>
                <nav className={iStyles.navigation}>
                    {sections.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={(link.active ? iStyles.navLinkActive : iStyles.navLink)
                                + " pt-4 pb-4 text text_type_main-default"}
                            onClick={() => dispatch(setActiveSection(link.id))}
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>
            </div>
        )
    }
)


