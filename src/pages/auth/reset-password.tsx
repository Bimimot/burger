import React, {FC} from "react";
import { TConfirmForm, Tinputs, TfooterLink } from "../../utils/proptypes";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { AuthForm } from "../../components/auth-form/auth-form";
import { Redirect } from 'react-router-dom';
import { restorePass } from "../../services/slicers/profile/profile";

export const ResetPassPage: FC = () => {
    const arrInputs: Tinputs = [
        { name: "password", type: "password", placeholder: "Введите новый пароль", value: "" },
        { name: "token", type: "text", placeholder: "Введите код из письма", value: "" },
    ];

    const footerLinks: Array<TfooterLink> = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title: string = "Восстановление пароля";


    const dispatch = useDispatch();
    const confirm: TConfirmForm = {
        callback: () => dispatch(restorePass()),
        text: "Восстановить"
    };

    const { isAuth, canRestorePass } = useSelector(store => store.profile.user)

    return (isAuth || !canRestorePass)
        ? <Redirect to={'/'} /> : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}