import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { IngredientDescription } from "../../components/ingredient-details/ingredient-desc";
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';

export const IngredientPage = () => {
    const { id } = useParams();
    const { isLoading, isError, isLoaded, items } = useSelector(store => store.foods);
    const [ingredient, setIngredient] = useState({});

    useEffect(() => {
        if (!!items.length) {
            setIngredient(items.find(item => item._id === id))
        }
    }, [isLoaded, items, id])

    return (
        <>
            {isLoaded && <IngredientDescription ingredient={ingredient} />}
            {isLoading && <Loader text={"Ищем на кухне"} />}
            {isError && <ErrorMessage />}
        </>
    )
}