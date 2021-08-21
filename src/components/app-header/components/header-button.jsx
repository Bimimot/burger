import React from 'react';
import headerStyles from '../app-header.module.css';
import { headerButtonProptypes } from '../../../utils/proptypes';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const HeaderButton = React.memo(
    (props) => {
        const { callback, icon, type, text } = props;
        HeaderButton.propTypes = headerButtonProptypes;

        const icons = {
            burger: BurgerIcon,
            list: ListIcon,
            profile: ProfileIcon
        };

        const ButtonIcon = icons[icon];

        return (
            <button className={headerStyles["button-" + type]} onClick={!!callback ? callback : null}>
                <ButtonIcon type={type} />
                <p className="text text_type_main-small pl-1">{text}</p>
            </button>
        )
    }
)