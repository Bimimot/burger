import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

export const ForgotPassPage = () => {
    const arrInputs = [
        { name: "email", type: "email", placeholder: "Укажите e-mail", value: "" }
    ];
    const footerLinks = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title = "Восстановление пароля";

    const confirm = {
        text: "Восстановить",
        callBack: null
    }

    const isAuth = useSelector(store => store.profile.user.isAuth);

    return isAuth
        ? <Redirect to={'/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}