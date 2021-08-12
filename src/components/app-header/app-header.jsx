import React from 'react';
import headerStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './header-button';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <header className={headerStyles.header + " pt-4 pb-4"}>
                <div className={headerStyles.content}>
                    <nav className={headerStyles.menu}>
                        <HeaderButton
                            icon={<BurgerIcon type="primary" />}
                            text="Конструктор"
                        />

                        <HeaderButton
                            icon={<ListIcon type="primary" />}
                            text="Лента заказов"
                        />
                    </nav>
                    <Logo />
                    <HeaderButton
                        icon={<ProfileIcon type="primary" />}
                        text="Личный кабинет"
                        profile
                    />

                </div>


            </header>
        )
    }

}