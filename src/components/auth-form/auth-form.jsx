import React, { useState } from "react";
import fStyles from './form.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { AuthFormFooter } from "./auth-form-footer";

export const AuthForm = ({data}) => {
    const { title, arrInputs, footerLinks, confirm } = data;
    const [state, setState] = useState({
        arrInputs: arrInputs.map(input => ({
            ...input,
            icon: input.type === "password" ? "HideIcon" : input.icon,
            valid: false,
            error: ""
        }))
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setState({
            ...state,
            arrInputs: arrInputs.map(input => input.name === name ? { ...input, value } : input)
        });
    };

    const handleIconClick = (input) => {
        console.log("Icon!");

        if (input.name === "password") {
            const newInputState = {
                ...input,
                type: input.type === "password" ? "text" : "password",
                icon: input.type === "password" ? "ShowIcon" : "HideIcon"
            };
            setState({
                ...state,
                arrInputs: arrInputs.map(inputState =>
                    inputState.name === input.name ? newInputState : inputState)
            })
        }
    }

    return (
        <form className={fStyles.form}>
            {!!title && <h2 className="text text_type_main-medium">{title}</h2>}
            {state.arrInputs.map(input =>
                <Input 
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    icon={input.type === "password" ? "HideIcon" : input.icon}
                    placeholder={input.placeholder}
                    onChange={handleInputChange}
                    onIconClick={() => handleIconClick(input)}
                />
            )}
            <Button onClick={confirm.callback}>
                {!!confirm.text ? confirm.text : "Отправить"}
            </Button>
            {!!footerLinks && <AuthFormFooter footerLinks={footerLinks}/>}
        </form>
    )
}