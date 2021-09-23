import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "../../components/auth-form/auth-form";
import { registerUser } from "../../services/slicers/profile";
import { Redirect } from 'react-router-dom';

export const RegisterPage = () => {
    const arrInputs = [
        { name: "name", type: "text", placeholder: "Имя", value: "" },
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];

    const footerLinks = [
        { desc: "Уже зарегистрированы?", text: "Войти", pathname: "/login" }
    ];

    const title = "Регистрация";
    
    const dispatch = useDispatch();
    const confirm = {
        callback: () => dispatch(registerUser()),
        text: "Зарегистрироваться"
    };

    const isAuth = useSelector(store => store.profile.user.isAuth);

    return isAuth
        ? <Redirect to={'/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}