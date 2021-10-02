import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pStyles from '../pages.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { FeedBurgers } from '../../components/feed-burgers/feed-burgers';
import { FeedStatus } from '../../components/feed-status/feed-status';


export const FeedPage = () => {
    const burgers = useSelector(store => store.wsFeed.orders);
    return (
        <div className={pStyles.content}>
            <FeedBurgers burgers={burgers} title={"Лента заказов"} />
            <FeedStatus />
        </div>

    )
}
