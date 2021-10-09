import React, {FC} from "react";
import { TConfirmForm, Tinputs, TfooterLink } from "../../utils/proptypes";
import { AuthForm } from "../../components/auth-form/auth-form";
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import { Redirect } from 'react-router-dom';
import { resetPass } from "../../services/slicers/profile/profile";

export const ForgotPassPage: FC = () => {
    const arrInputs: Tinputs = [
        { name: "email", type: "email", placeholder: "Укажите e-mail", value: "" }
    ];
    const footerLinks: Array<TfooterLink> = [
        { desc: "Вспомнили пароль?", text: "Войти", pathname: "/login" }
    ];

    const title: string = "Восстановление пароля";

    const isAuth = useSelector(store => store.profile.user.isAuth);

    const dispatch = useDispatch();

    const confirm: TConfirmForm = {
        callback: () => dispatch(resetPass()),
        text: "Восстановить"
    };

    return isAuth
        ? <Redirect to={'/'} />
        : <AuthForm data={{ title, arrInputs, footerLinks, confirm }} />
}
