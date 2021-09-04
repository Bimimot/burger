import React, { useEffect } from 'react';
import oStyles from "./order-details.module.css";
import { useState } from 'react';
import { randomInteger } from '../../utils/helpers';

export const LoaderNumber = () => {
    const randomNumber = () => randomInteger(1000, 9999);
    const [number, setNumber] = useState(randomNumber)

    useEffect(() => {        
        let timerNumber = setInterval(() =>
            setNumber(randomNumber)
        , 50);
        return () => { clearInterval(timerNumber) };
    }, [])

    return(
        <h1 className={oStyles.titleLoader + " text text_type_digits-large"}>{number}</h1>
    )
}