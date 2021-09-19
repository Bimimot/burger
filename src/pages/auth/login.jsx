import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";

export const LoginPage = () => {
    const arrInputs = [
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];
    const footerLinks = [
        { desc: "Вы - новый пользователь?", text: "Зарегистрироваться", pathname: "/register" },
        { desc: "Забыли пароль?", text: "Восстановить пароль", pathname: "/forgot-password" },
    ];

    const confirm = {
        callback: null,
        text: "Войти"
    };

    const title = "Вход";

    return <AuthForm data={{ title, arrInputs, footerLinks, confirm }}/>
}