import React from "react";
import { AuthForm } from "../../components/auth-form/auth-form";

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

    return <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}