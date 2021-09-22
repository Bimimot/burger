import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useLocation, Redirect } from 'react-router-dom';
import { AuthForm } from "../../components/auth-form/auth-form";
import { loginUser } from "../../services/slicers/profile";

export const LoginPage = () => {
    const location = useLocation();
    const isAuth = useSelector(store => store.profile.user.isAuth);
    const dispatch = useDispatch();

    const arrInputs = [
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];
    const footerLinks = [
        { desc: "Вы - новый пользователь?", text: "Зарегистрироваться", pathname: "/register" },
        { desc: "Забыли пароль?", text: "Восстановить пароль", pathname: "/forgot-password" },
    ];

    const confirm = {
        callback: () => dispatch(loginUser()),
        text: "Войти"
    };

    const title = "Вход";

    return isAuth
        ? <Redirect to={location.state?.from || '/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}