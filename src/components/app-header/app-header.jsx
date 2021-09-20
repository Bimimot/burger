import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { HeaderButton } from './components/header-button';

export const AppHeader = React.memo(

    () => {
        const headerLinks = useSelector(store => store.header);
        const dispatch = useDispatch();
        const { pathname } = useLocation();

        useEffect(() => {
            let maxMatchLength = 0;
            let activeKey = "";

            for (const key in headerLinks) {
                const link = headerLinks[key].link

                if (pathname.includes(link) && link.length > maxMatchLength) {
                    activeKey = key;
                    maxMatchLength = link.length;
                }
                if (link === "/" && pathname !== "/") {
                    activeKey = "";
                }
            };
            console.log("KEY!", activeKey)
            dispatch({ type: "header/onChangeLink", payload: activeKey })
        }, [pathname]);

        //если линк есть в pathname - запомнить длину линка
        //для всех совпадающих линков выбрать тот, который самый длинный

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
