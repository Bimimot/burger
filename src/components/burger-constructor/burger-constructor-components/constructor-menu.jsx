import cStyles from '../burger-constructor.module.css';
import { menuPropTypes } from '../burger-constructor-proptypes';
import { useState, useEffect } from 'react';

export const ConstructorMenu = ({ sections, title }) => {
    ConstructorMenu.propTypes = menuPropTypes;

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        setMenu(sections.map((s, i) =>
            ({ ...s, active: !i }))
        )
    }, [sections]);

    return (
        <div className={cStyles.menu}>
            {!!title && <h1 className={"text text_type_main-large mb-5"}>{title}</h1>}
            <nav className={cStyles.navigation}>
                {menu.map(link => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        className={(link.active ? cStyles.navLinkActive : cStyles.navLink)
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

