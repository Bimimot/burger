import React, { FC, useState, useEffect } from "react";
import pStyles from '../pages.module.css';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { useParams, useHistory } from 'react-router-dom';
import { IngredientDescription } from "../../components/ingredient-details/ingredient-desc";
import { IngredientsDetails } from '../../components/ingredient-details/ingredients-details';
import { Modal } from '../../components/modal/modal';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { NoPage } from "..";
import { Tfood } from "../../utils/proptypes";

export const IngredientPageModal = () => {
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
                    children={<IngredientsDetails ingredient={ingredient.item!} />}
                />}
        </div>
    )
}

export const IngredientPage = () => {
    const { id } = useParams<{id: string}>();
    const { isLoading, isError, isLoaded, items } = useSelector(store => store.foods);
    const [ingredient, setIngredient] = useState<Tfood>();

    useEffect(() => {
        if (!!items.length) {
            const ingred = items.find(item => item._id === id);
            if (!!ingred) {
                setIngredient(ingred)
            }
        }
    }, [isLoaded, items, id]);

    return (
        <div className={pStyles.modalPage}>
            {isLoaded &&
                <>
                    {!!ingredient
                        ? <IngredientDescription ingredient={ingredient} />
                        : <NoPage />}
                </>
            }
            {isLoading && <Loader text={"Ищем на кухне"} />}
            {isError && <ErrorMessage />}

        </div>
    )
}