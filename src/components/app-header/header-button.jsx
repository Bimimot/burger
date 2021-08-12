import React from "react";
import headerStyles from './app-header.module.css';

export const HeaderButton = (props) => {
    const { callback, icon, profile, text } = props;

    return (
        <button className={!!profile ? headerStyles.buttonProfile : headerStyles.button}
                onClick={!!callback ? callback : null}>
            {!!icon && icon}
            <p className="text text_type_main-default pl-1"> {!!text ? text : "Нажать"} </p>
        </button>
    )
}