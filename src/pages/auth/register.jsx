import React from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { AuthForm } from "../../components/auth-form/auth-form";
import { register } from "../../utils/api";
import { setCookie } from "../../utils/helpers";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = useSelector(store => store.auth.data);

    const registerUser = (event) => {
        event.preventDefault();

        dispatch({ type: "profile/profileLoading" });
        register(data)
            .then(res => {
                // const newUser = {
                //     name: res.user.name,
                //     email: res.user.email
                // };
                const newTokens = {
                    accessToken: res.user.accessToken,
                    refreshToken: res.user.refreshToken
                };
                batch(() => {
                    // dispatch({ type: "profile/setProfile", payload: newUser });
                    // dispatch({ type: "profile/profileSuccess" });
                    dispatch({ type: "auth/clearForm" });
                })
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("token", res.accessToken.split('Bearer ')[1]);

                return
            })
            .then(() => history.push("/"))
            .catch(err => {
                console.log("Error with register", err);
                dispatch({ type: "profile/profileIsError" });
            })
    };

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