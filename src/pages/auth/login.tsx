import React, {FC} from "react";
import { TConfirmForm, Tinputs, TfooterLink, IlocationState } from "../../utils/proptypes";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { useLocation, Redirect } from 'react-router-dom';
import { AuthForm } from "../../components/auth-form/auth-form";
import { loginUser } from "../../services/slicers/profile/profile";

export const LoginPage:FC = () => {
    const location = useLocation<IlocationState>();
    const isAuth = useSelector(store => store.profile.user.isAuth);
    const dispatch = useDispatch();

    const arrInputs: Tinputs = [
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];
    const footerLinks: Array<TfooterLink> = [
        { desc: "Вы - новый пользователь?", text: "Зарегистрироваться", pathname: "/register" },
        { desc: "Забыли пароль?", text: "Восстановить пароль", pathname: "/forgot-password" },
    ];

    const confirm: TConfirmForm = {
        callback: () => dispatch(loginUser()),
        text: "Войти"
    };

    const title: string = "Вход";


    return isAuth
        ? <Redirect to={location.state?.from || '/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}