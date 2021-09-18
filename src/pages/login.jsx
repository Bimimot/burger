import React from "react";
import { AuthForm } from "../components/auth-form/auth-form";

export const LoginPage = () => {
    const loginInputs = [
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ]

    return <AuthForm title={"Вход"} arrInputs={loginInputs}/>
}