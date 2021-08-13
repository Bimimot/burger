import PropTypes from 'prop-types';
import headerStyles from '../app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const HeaderButton = (props) => {
    const { callback, icon, type, text } = props;

    HeaderButton.propTypes = {
        callback: PropTypes.func,
        icon: PropTypes.oneOf(['burger', 'list', 'profile']).isRequired,
        type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
        text: PropTypes.string.isRequired
    };

    const icons = {
        burger: BurgerIcon,
        list: ListIcon,
        profile: ProfileIcon
    };

    const ButtonIcon = icons[icon];


    return (
        <button
            className={headerStyles["button-"+type]}
            onClick={!!callback ? callback : null}
        >
            <ButtonIcon type={type} />
            <p className="text text_type_main-small pl-1">{text}</p>

        </button>
    )
}