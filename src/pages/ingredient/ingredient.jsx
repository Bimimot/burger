import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { IngredientDescription } from "../../components/ingredient-details/ingredient-desc";
import { IngredientsDetails } from '../../components/ingredient-details/ingredients-details';
import { Modal } from '../../components/modal/modal';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { NoPage } from "..";


export const IngredientPage = () => {
    const showModal = useSelector(store => store.ingredient.show);

    return (
        showModal
            ? <IngredientModal />
            : <IngredientWithoutModal />
    )
}


const IngredientModal = () => {
    const ingredient = useSelector(store => store.ingredient);
    const dispatch = useDispatch();
    const history = useHistory();
    const closeModal = () => {
        dispatch({ type: "ingredient/closeIngredient" });
        history.push('/');
    }

    return (
        <div style={{ position: "fixed", overflow: "hidden" }}>
            {ingredient.show &&
                <Modal
                    title="Детали ингредиента"
                    onClose={closeModal}
                    children={<IngredientsDetails ingredient={ingredient.item} />}
                />}
        </div>
    )
}

const IngredientWithoutModal = () => {
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
            {isLoaded &&
                <>
                    {!!ingredient
                        ? <IngredientDescription ingredient={ingredient} />
                        : <NoPage />}
                </>
            }
            {isLoading && <Loader text={"Ищем на кухне"} />}
            {isError && <ErrorMessage />}

        </>
    )
}