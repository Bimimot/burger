import React from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { AuthForm } from "../../components/auth-form/auth-form";
import { login } from "../../utils/api";
import { setCookie } from "../../utils/helpers";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const data = useSelector(store => store.authForm.data);
    const isAuth = useSelector(store => store.profile.user.isAuth);

    const loginUser = (event) => {
        event.preventDefault();

        dispatch({ type: "profile/profileLoading" });
        login(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
 
                console.log("result of login --------->>>>>>>>", res);
                

                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("token", res.accessToken.split('Bearer ')[1]);
                batch(() => {
                    dispatch({type: "profile/setProfile", payload: newUser});
                    dispatch({ type: "profile/profileSuccess" });
                    dispatch({ type: "auth/clearForm" });
                })

                return
            })
            //.then(() => history.push("/"))
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
    console.log("isAuth from LOGIN>>>>>>>>>", isAuth);
    return isAuth
        ? <Redirect to={location.state?.from || '/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}