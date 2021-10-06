import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { resetPass } from "../../services/slicers/profile/profile";

export const ForgotPassPage = () => {
    const arrInputs = [
        { name: "email", type: "email", placeholder: "Укажите e-mail", value: "" }
    ];
    const footerLinks = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title = "Восстановление пароля";

    const isAuth = useSelector(store => store.profile.user.isAuth);

    const dispatch = useDispatch();

    const confirm = {
        callback: () => dispatch(resetPass()),
        text: "Восстановить"
    };

    return isAuth
        ? <Redirect to={'/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}