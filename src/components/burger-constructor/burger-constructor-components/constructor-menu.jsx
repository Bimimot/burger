import cStyles from '../burger-constructor.module.css';
import { useState } from 'react';

export const ConstructorMenu = (props) => {
    const { sections, title } = props;
    const [menu, setMenu] = useState(sections.map((s, i) => ({ ...s, active: !i })));

    return (
        <div className={cStyles.menu}>
            <h1 className={"text text_type_main-large mb-5"}>{title}</h1>
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