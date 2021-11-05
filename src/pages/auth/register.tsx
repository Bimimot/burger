import React, {FC} from "react";
import { TConfirmForm, Tinputs, TfooterLink } from "../../utils/proptypes";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { AuthForm } from "../../components/auth-form/auth-form";
import { registerUser } from "../../services/slicers/profile/profile";
import { Redirect } from 'react-router-dom';

export const RegisterPage:FC = () => {
    const arrInputs: Tinputs = [
        { name: "name", type: "text", placeholder: "Имя", value: "" },
        { name: "email", type: "email", placeholder: "E-mail", value: "" },
        { name: "password", type: "password", placeholder: "Пароль", value: "" },
    ];

    const footerLinks: Array<TfooterLink> = [
        { desc: "Уже зарегистрированы?", text: "Войти", pathname: "/login" }
    ];

    const title: string = "Регистрация";
    

    const confirm: TConfirmForm = {
        callback: () => dispatch(registerUser()),
        text: "Зарегистрироваться"
    };

    const dispatch = useDispatch();    
    const isAuth = useSelector(store => store.profile.user.isAuth);

    return isAuth
        ? <Redirect to={'/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}


