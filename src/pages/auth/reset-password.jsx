import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";

export const ResetPassPage = () => {
    const arrInputs = [
        { name: "password", type: "password", placeholder: "Введите новый пароль", value: "" },
        { name: "code", type: "text", placeholder: "Введите код из письма", value: "" },
    ];

    const footerLinks = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title = "Восстановление пароля";

    const confirm = {
        text: "Восстановить",
        callBack: null
    }

    return <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}