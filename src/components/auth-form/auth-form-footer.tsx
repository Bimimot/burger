import React, { FC } from 'react';
import { Link } from "react-router-dom";
import fStyles from './form.module.css';
import { TFooterLinksProps } from "../../utils/proptypes";

export const AuthFormFooter: FC<TFooterLinksProps> = ({ footerLinks }) => {
    return (
        <div className={fStyles.footer}>
            {footerLinks.map((link, i) =>
                <div key={i} className={fStyles.footerBlock}>
                    <span className={`text text_type_main-default ${fStyles.footerDesc}`}>{link.desc}</span>
                    &nbsp;&nbsp;
                    <Link to={link.pathname}>
                        <span className={`text text_type_main-default ${fStyles.footerLink}`}> {link.text} </span>
                    </Link>
                </div>
            )}
        </div>
    )
}