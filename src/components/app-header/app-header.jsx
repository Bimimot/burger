import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './components/header-button';

export const AppHeader = React.memo(
    () =>
        <header className={headerStyles.header}>
            <nav className={headerStyles.content + " pt-4 pb-4"}>
                <div className={headerStyles.menu}>
                    <HeaderButton type="primary" icon="burger" text="Конструктор" />
                    <HeaderButton type="secondary" icon="list" text="Лента заказов" />
                </div>
                <HeaderButton type="secondary" icon="profile" text="Личный кабинет" />
                <a className={headerStyles.logo} href="/"> <Logo /> </a>
            </nav>
        </header>
)
