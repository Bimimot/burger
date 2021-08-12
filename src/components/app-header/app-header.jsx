import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './header-button';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.content + " pt-4 pb-4"}>
                    <nav className={headerStyles.menu}>
                        <HeaderButton type="primary" icon="burger" text="Конструктор" />
                        <HeaderButton type="secondary" icon="list" text="Лента заказов" />
                    </nav>
                    <div className={headerStyles.logo}> <Logo /> </div>

                    <HeaderButton type="secondary" icon="profile" text="Личный кабинет" />
                </div>


            </header>
        )
    }

}