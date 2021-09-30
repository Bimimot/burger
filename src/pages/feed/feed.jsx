import React from 'react';
import { useSelector } from 'react-redux';
import pStyles from '../pages.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { FeedBurgers } from '../../components/feed-burgers/feed-burgers';
import { FeedStatus } from '../../components/feed-status/feed-status';



export const FeedPage = () => {
    const { isLoading, isError, isLoaded } = useSelector(store => store.foods);

    return (
        
            <div className={pStyles.content}>
                <FeedBurgers />
                <FeedStatus />
            </div>

    )
}
