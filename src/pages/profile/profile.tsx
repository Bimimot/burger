import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import pStyles from './profile.module.css';
import { Switch, NavLink, Route, Redirect, useRouteMatch} from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutUser } from "../../services/slicers/profile/profile";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedBurgers } from "../../components/feed-burgers/feed-burgers";
import { BurgerOrderPage } from "..";
import { onChangeInput, updateUserProfile } from "../../services/slicers/profile/profile";
import { Loader } from "../../components/loader/loader";
import { ErrorMessage } from "../../components/error-message/error-message";
import { NoOrdersPage } from "..";


export const ProfilePage: FC = () => {
    const { path } = useRouteMatch();

    return (
        <div className={pStyles.profile}>
            <ProfileMenu />
            <Switch>
                <Route path={`${path}`} exact><ProfileForm /></Route>
                <Route path={`${path}/orders`} exact><ProfileOrders /></Route>

                <Route path={`${path}/orders/:id`} exact>
                    <BurgerOrderPage type={"profile"} />
                </Route>
                <Route><Redirect to={`${path}`} /></Route>
            </Switch>
        </div>
    )
}

const ProfileMenu: FC = () => {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();

    const classLink = `text text_type_main-medium ${pStyles.link}`;
    const classActiveLink = `text text_type_main-medium ${pStyles.activeLink}`;

    return (
        <div className={pStyles.menu}>
            <NavLink exact to={`${url}`} className={classLink} activeClassName={classActiveLink}>Профиль</NavLink>
            <NavLink to={`${url}/orders`} className={classLink} activeClassName={classActiveLink}>История заказов</NavLink>
            <span className={classLink} onClick={() => dispatch(logoutUser())}>Выход</span>
        </div>
    )
}

const ProfileForm: FC = () => {
    const form = useSelector(store => store.profile.form);
    const dispatch = useDispatch();

    const changeProfile = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateUserProfile(form.inputs))
    }

    return (
        <form className={pStyles.form} onSubmit={(event) => changeProfile(event)} id="profileForm">
            <Input
                type={"text"}
                value={form.inputs.name}
                placeholder={"Имя"}
                icon={"EditIcon"}
                onChange={(event) => dispatch(onChangeInput({ key: "name", value: event.target.value }))}
            />
            <Input
                type={"email"}
                value={form.inputs.email}
                placeholder={"E-mail"}
                icon={"EditIcon"}
                onChange={(event) => dispatch(onChangeInput({ key: "email", value: event.target.value }))}
            />
            <Input
                type={"password"}
                value={form.inputs.password}
                placeholder={"Пароль"}
                icon={"EditIcon"}
                onChange={(event) => dispatch(onChangeInput({ key: "password", value: event.target.value }))}
            />
            <div className={pStyles.formSubmit}>
                <Button>
                    Сохранить
                </Button>
            </div>
        </form>

    )
}

const ProfileOrders: FC = () => {
    const { orders, success, isError } = useSelector(store => store.wsOrders);
    const isLoadedFoods = useSelector(store => store.foods.isLoaded);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoadedFoods && !success) {
            dispatch({ type: "wsOrders/wsInit" });
        }
    }, [isLoadedFoods, success, dispatch]);

    useEffect(() => {
        return () => {
            dispatch({ type: "wsOrders/wsClosed" });
        }
    }, []);

    return (
        <>
            {(!!orders && success)
                ? (!!orders.length ? <FeedBurgers burgers={orders} /> : <NoOrdersPage />)
                : <Loader text={"Уточняем на кухне"} />}
            {isError && <ErrorMessage />}
        </>
    )
}