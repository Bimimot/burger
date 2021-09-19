import React from 'react';
import { useSelector } from 'react-redux';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { HeaderButton } from './components/header-button';

export const AppHeader = React.memo(

    () => {
        const headerLinks = useSelector(store => store.header);

        return (
            <header className={headerStyles.header}>
                <nav className={headerStyles.content + " pt-4 pb-4"}>
                    <div className={headerStyles.menu}>
                        <HeaderButton data={headerLinks.burger} />
                        <HeaderButton data={headerLinks.orders} />
                    </div>
                    <HeaderButton data={headerLinks.profile} />
                    <div className={headerStyles.logo}>
                        <Link to={"/"}>
                            <Logo />
                        </Link>
                    </div>
                </nav>
            </header>)
    }
)
