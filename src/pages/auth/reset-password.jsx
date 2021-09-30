import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { restorePass } from "../../services/slicers/profile";

export const ResetPassPage = () => {
    const arrInputs = [
        { name: "password", type: "password", placeholder: "Введите новый пароль", value: "" },
        { name: "token", type: "text", placeholder: "Введите код из письма", value: "" },
    ];

    const footerLinks = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title = "Восстановление пароля";


    const dispatch = useDispatch();
    const confirm = {
        callback: () => dispatch(restorePass()),
        text: "Восстановить"
    };

    const { isAuth, canRestorePass } = useSelector(store => store.profile.user)

    return (isAuth || !canRestorePass)
        ? <Redirect to={'/'} /> : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}