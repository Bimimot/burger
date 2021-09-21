import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { AuthForm } from "../../components/auth-form/auth-form";
import { login } from "../../utils/api";
import { setCookie } from "../../utils/helpers";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = useSelector(store => store.auth.data);

    const loginUser = (event) => {
        event.preventDefault();

        dispatch({ type: "profile/profileLoading" });
        login(data)
            .then(res => {
                // const newUser = {
                //     name: res.user.name,
                //     email: res.user.email
                // };
                // const newTokens = {
                //     accessToken: res.user.accessToken,
                //     refreshToken: res.user.refreshToken
                // };
                // batch(() => {
                //     // dispatch({type: "profile/setProfile", payload: newUser});
                //     // dispatch({ type: "profile/profileSuccess" });
                //     dispatch({ type: "auth/clearForm" });
                // })
                // localStorage.setItem('user', newTokens);

                console.log("result of login --------->>>>>>>>", res);
                
                dispatch({ type: "auth/clearForm" });
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("token", res.accessToken.split('Bearer ')[1]);

                return
            })
            .then(() => history.push("/"))
            .catch(err => {
                console.log("Error with login", err);
                dispatch({ type: "profile/profileIsError" });
            })
    };

    const arrInputs = [
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];
    const footerLinks = [
        { desc: "Вы - новый пользователь?", text: "Зарегистрироваться", pathname: "/register" },
        { desc: "Забыли пароль?", text: "Восстановить пароль", pathname: "/forgot-password" },
    ];

    const confirm = {
        callback: loginUser,
        text: "Войти"
    };

    const title = "Вход";

    
    return <AuthForm data={{ title, arrInputs, footerLinks, confirm }}/>
}