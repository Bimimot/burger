import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";
import { registerUser } from "../../services/slicers/profile";

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
    
    const confirm = {
        callback: registerUser,
        text: "Зарегистрироваться"
    };

    return <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}