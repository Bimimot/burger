import React from 'react';
import iStyles from '../burger-ingredients.module.css';
import { menuPropTypes } from '../../../utils/proptypes';
import { useState, useEffect } from 'react';

export const IngredientsMenu = React.memo(
    ({ sections, title }) => {
        IngredientsMenu.propTypes = menuPropTypes;

        const [menu, setMenu] = useState([]);
        useEffect(() => {
            setMenu(sections.map((s, i) =>
                ({ ...s, active: !i }))
            )
        }, [sections]);

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
                            onClick={() => setMenu(menu.map(point => ({ ...point, active: point === link })))}
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>
            </div>
        )
    }
)

