import React from "react";
import pStyles from './profile.module.css';
import {
    Switch, NavLink, Link, Route, Redirect,
    useRouteMatch, useParams, useHistory
} from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NoPage } from "..";
import { useSelector } from "react-redux";

export const ProfilePage = () => {
    const { path } = useRouteMatch();

    return (
        <div className={pStyles.profile}>
            <ProfileMenu />
            <Switch>
                <Route path={`${path}`} exact><ProfileForm /></Route>
                <Route path={`${path}/orders`} exact><ProfileOrders /></Route>
                <Route path={`${path}/orders/:id`} exact><ProfileOrder /></Route>
                <Route><Redirect to={`${path}`} /></Route>
            </Switch>
        </div>
    )
}

const ProfileMenu = () => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const logout = () => {
        history.push('/login')
    }

    const classLink = `text text_type_main-medium ${pStyles.link}`;
    const classActiveLink = `text text_type_main-medium ${pStyles.activeLink}`;

    return (
        <div className={pStyles.menu}>
            <NavLink exact to={`${url}`} className={classLink} activeClassName={classActiveLink}>Профиль</NavLink>
            <NavLink to={`${url}/orders`} className={classLink} activeClassName={classActiveLink}>История заказов</NavLink>
            <span className={classLink} onClick={logout}>Выход</span>
        </div>
    )
}

const ProfileForm = () => {
    const form = useSelector(store => store.profile.form);

    return (
        <div className={pStyles.form}>
            <Input type={"text"} value={form.name} placeholder={"Имя"} icon={"EditIcon"}/>
            <Input email={"mail"} value={form.email} placeholder={"E-mail"} icon={"EditIcon"}/>
            <Input password={"password"} value={form.password} placeholder={"Пароль"} icon={"EditIcon"}/>
    </div>

    )
}

const ProfileOrders = () => {
    const orders = [10, 23, 32, 48];
    const { url } = useRouteMatch();


    const style = { flexDirection: "column", gap: "16px", cursor: "pointer", margin: "50px" };

    return (
        <div style={style}>
        {orders.map(order =>
            <Link to={`${url}/${order}`} key={order}>
                <h2 className="text text_type_main">{`Заказ № ${order}`}</h2>
            </Link>
        )}
        </div>
    )
}

const ProfileOrder = () => {
    const { id } = useParams();
    return (<>
        <h1 className="text text_type_main text_size_large">{`Страница заказа № ${id}`}</h1>
    </>)

}