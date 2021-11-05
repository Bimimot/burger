import React, { useEffect, FC } from 'react';
import { THeaderState } from '../../services/slicers/header/header-types';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { HeaderButton } from './components/header-button';

export const AppHeader: FC = React.memo(
    () => {
        const headerLinks = useSelector(store => store.header);
        const dispatch = useDispatch();
        const { pathname } = useLocation();

        useEffect(() => {
            let maxMatchLength = 0;
            let activeKey = "";

            for (const key in headerLinks) {
                const link = headerLinks[key as keyof THeaderState].link

                if (pathname.includes(link) && link.length > maxMatchLength) {
                    activeKey = key;
                    maxMatchLength = link.length;
                }
                if (link === "/" && pathname !== "/") {
                    activeKey = "";
                }
            };
            dispatch({ type: "header/onChangeLink", payload: activeKey })
        }, [pathname]);

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
