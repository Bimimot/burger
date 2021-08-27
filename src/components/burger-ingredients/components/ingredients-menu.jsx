import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { menuPropTypes } from '../../../utils/proptypes';

export const IngredientsMenu = React.memo(
    ({ menu, clickMenuPoint, title }) => {
        IngredientsMenu.propTypes = menuPropTypes;

        return (
            <div className={iStyles.menu}>
                {!!title && <h1 className={"text text_type_main-large mb-5"}>{title}</h1>}
                <nav className={iStyles.navigation}>
                    {menu.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={(link.active ? iStyles.navLinkActive : iStyles.navLink)
                                + " pt-4 pb-4 text text_type_main-default"}
                            onClick={() => clickMenuPoint(link.id)}
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>
            </div>
        )
    }
)


