import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import fStyles from './form.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { AuthFormFooter } from "./auth-form-footer";



export const AuthForm = ({ data }) => {
    const dispatch = useDispatch();

    const { title, arrInputs, footerLinks, confirm } = data;
    const inputs = useSelector(store => store.authForm.arrInputs);

    useEffect(() => {
        dispatch({type: "auth/setInputs", payload: arrInputs})
    }, []);

    return (
        <form className={fStyles.form} onSubmit={confirm.callback}>
            {!!title && <h2 className="text text_type_main-medium">{title}</h2>}
            {inputs.map(input =>
                <Input
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    icon={input.type === "password" ? "HideIcon" : input.icon}
                    placeholder={input.placeholder}
                    onChange={(event) => dispatch({type: "auth/handleInput", payload: {name: input.name, value: event.target.value}})}
                    onIconClick={() => dispatch({type: "auth/handleIcon", payload: input})}
                />
            )}
            <Button onClick={confirm.callback}>
                {!!confirm.text ? confirm.text : "Отправить"}
            </Button>
            {!!footerLinks && <AuthFormFooter footerLinks={footerLinks} />}
        </form>
    )
}