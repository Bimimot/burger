import React from 'react';
import headerStyles from '../app-header.module.css';
import { Link } from 'react-router-dom';
import { headerButtonProptypes } from '../../../utils/proptypes';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const HeaderButton = React.memo(
    ({ data }) => {
        HeaderButton.propTypes = headerButtonProptypes;
        
        const { icon, text, link, type } = data;
        const icons = {
            burger: BurgerIcon,
            list: ListIcon,
            profile: ProfileIcon
        };
        const ButtonIcon = icons[icon];
        

        return (
            <button className={headerStyles["button-" + type]}>
                <Link to={link}>
                    <ButtonIcon type={type} />
                    <p className="text text_type_main-small pl-1">{text}</p>
                </Link>
            </button>
        )
    }
)